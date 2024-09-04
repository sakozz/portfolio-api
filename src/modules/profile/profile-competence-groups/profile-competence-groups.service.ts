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
import { Actions } from 'src/modules/casl/casal-actions';
import { ProfileCompetenceGroupAbilityCtx } from './profile-competence-groups..ability';
import { AbilityFactory } from 'src/modules/casl/ability.factory';

@Injectable()
export class ProfileCompetenceGroupsService {
  constructor(
    private ability: AbilityFactory,
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
    const profile = await this.profileRepo.findOneBy({ userId: userId });
    newRecord.profile = profile;

    /** profileId for Subject should be the same as id of profile of current user  */
    this.ability.authorize({
      action: Actions.Create,
      subject: newRecord,
      profileId: profileId,
    } as ProfileCompetenceGroupAbilityCtx);

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

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(
    id: number,
    newData: SaveProfileCompetenceGroupDto,
    user: SessionUser,
  ): Promise<ProfileCompetenceGroup> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ userId: user.id });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.ability.authorize({
      action: Actions.Update,
      subject: record,
      profileId: profile.id,
    } as ProfileCompetenceGroupAbilityCtx);

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
