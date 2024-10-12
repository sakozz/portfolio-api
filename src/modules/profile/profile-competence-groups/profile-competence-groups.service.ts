import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../../entities/profile.entity';
import { ProfileCompetenceGroup } from '../../../entities/profile-competence-group.entity';
import { GroupCompetence } from '../../../entities/group-competence.entity';
import { Competence } from '../../../entities/competence.entity';
import SaveProfileCompetenceGroupDto from './dto/save-profile-competence-group.dto';
import SaveGroupCompetenceDto from '../group-competences/dto/save-group-competence.dto';
import SessionUser from 'src/types/common';
import { Actions } from 'src/modules/abilities/abilities.actions';
import { newProfileCompetenceGroupAbilityCtx } from './profile-competence-groups..ability';
import { AbilityFactory } from 'src/modules/abilities/ability.factory';

@Injectable()
export class ProfileCompetenceGroupsService {
  constructor(
    private abilities: AbilityFactory,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(ProfileCompetenceGroup) private repo: Repository<ProfileCompetenceGroup>,
    @InjectRepository(Competence) private competenceRepo: Repository<Competence>,
    @InjectRepository(GroupCompetence) private groupCompetenceRepo: Repository<GroupCompetence>,
  ) {}

  async findOne(id: number): Promise<ProfileCompetenceGroup> {
    const record = await this.repo
      .createQueryBuilder('profileCompetenceGroup')
      .where('profileCompetenceGroup.id = :id', { id })
      .leftJoinAndSelect('profileCompetenceGroup.competences', 'groupCompetences')
      .leftJoinAndSelect('groupCompetences.competence', 'competence')
      .getOne();

    if (!record) throw new NotFoundException('Record Not found');
    return record;
  }

  async create(
    groupData: SaveProfileCompetenceGroupDto,
    profileId: number,
    userId: number,
  ): Promise<ProfileCompetenceGroup> {
    const newRecord = this.repo.create(groupData);
    const currentUserProfile = await this.profileRepo.findOneBy({ user: { id: userId } });
    newRecord.profileId = profileId;

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(
      newProfileCompetenceGroupAbilityCtx(Actions.Create, newRecord, currentUserProfile.id),
    );

    const profileFromParams = new Profile();
    profileFromParams.id = profileId;
    newRecord.profile = profileFromParams;
    newRecord.competences = await Promise.all(this.createCompetencesList(groupData.competences));
    return this.repo.save(newRecord);
  }

  async findAll(profileId: number): Promise<ProfileCompetenceGroup[]> {
    return this.queryBuilderWithCompetences(this.repo, profileId).getMany();
  }

  queryBuilderWithCompetences(repo, profileId: number) {
    return repo
      .createQueryBuilder('skillGroup')
      .where('skillGroup.profileId = :profileId', { profileId })
      .leftJoinAndSelect('skillGroup.competences', 'competenceGroup')
      .leftJoinAndSelect('competenceGroup.competence', 'competence');
  }

  async remove(id: number, userId: number): Promise<void> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: userId } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(
      newProfileCompetenceGroupAbilityCtx(Actions.Delete, record, profile.id),
    );

    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(
    id: number,
    newData: SaveProfileCompetenceGroupDto,
    user: SessionUser,
  ): Promise<ProfileCompetenceGroup> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: user.id } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(
      newProfileCompetenceGroupAbilityCtx(Actions.Update, record, profile.id),
    );

    const competences = await Promise.all(
      this.createOrSaveCompetencesList(record, newData.competences),
    );

    const result = await this.repo.save({ ...record, ...newData, competences });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return this.findOne(id);
  }

  createOrSaveCompetencesList(
    profileCompetenceGroup: ProfileCompetenceGroup,
    competenceGroups: SaveGroupCompetenceDto[],
  ) {
    return competenceGroups.map((item) => {
      const record = this.groupCompetenceRepo.create(item);
      record.group = profileCompetenceGroup;
      record.competence = this.competenceRepo.create({ id: item.competenceId });
      if (record.id) return this.groupCompetenceRepo.update(record.id, record).then(() => record);
      return this.groupCompetenceRepo.save(record);
    });
  }

  createCompetencesList(competenceGroups: SaveGroupCompetenceDto[]) {
    return competenceGroups.map((item) => {
      const record = this.groupCompetenceRepo.create(item);
      if (record.id) return Promise.resolve(record);

      record.competence = this.competenceRepo.create({ id: item.competenceId });
      return this.groupCompetenceRepo.save(record);
    });
  }
}
