import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../../../entities/profile.entity';
import { SkillGroup } from '../../../entities/skill-group.entity';
import { GroupCompetence } from '../../../entities/group-competence.entity';
import { Competence } from '../../../entities/competence.entity';
import SaveProfileCompetenceGroupDto from './dto/save-profile-competence-group.dto';
import SaveGroupCompetenceDto from '../group-competences/dto/save-group-competence.dto';

@Injectable()
export class SkillGroupsService {
  constructor(
    @InjectRepository(SkillGroup) private repo: Repository<SkillGroup>,
    @InjectRepository(Competence) private competenceRepo: Repository<Competence>,
    @InjectRepository(GroupCompetence) private groupCompetenceRepo: Repository<GroupCompetence>,
  ) {}

  async findOne(id: number): Promise<SkillGroup> {
    const experience = await this.repo.findOneBy({ id });
    if (!experience) throw new NotFoundException('Record Not found');
    return experience;
  }

  async create(groupData: SaveProfileCompetenceGroupDto, profileId: number): Promise<SkillGroup> {
    const newRecord = this.repo.create(groupData);
    const profile = new Profile();
    profile.id = profileId;
    newRecord.profile = profile;

    newRecord.competences = await Promise.all(
      this.createOrSaveCompetencesList(groupData.competences),
    );
    return this.repo.save(newRecord);
  }

  async findAll(profileId: number): Promise<SkillGroup[]> {
    return this.repo
      .createQueryBuilder('skillGroup')
      .where('skillGroup.profileId = :profileId', { profileId })
      .leftJoinAndSelect('skillGroup.competences', 'competenceGroup')
      .leftJoinAndSelect('competenceGroup.competence', 'competence')
      .getMany();
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, newData: SaveProfileCompetenceGroupDto): Promise<SkillGroup> {
    const record = await this.findOne(id);
    const result = this.repo.save({ ...record, ...newData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }

  createOrSaveCompetencesList(competenceGroups: SaveGroupCompetenceDto[]) {
    return competenceGroups.map((item) => {
      const record = this.groupCompetenceRepo.create(item);
      if (record.id) return Promise.resolve(record);

      record.competence = this.competenceRepo.create({ id: item.competenceId });
      return this.groupCompetenceRepo.save(record);
    });
  }
}
