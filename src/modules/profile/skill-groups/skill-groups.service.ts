import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import SkillGroupDto from './dto/skill-group.dto';
import { Profile } from '../../../entities/profile.entity';
import { SkillGroup } from '../../../entities/skill-group.entity';

@Injectable()
export class SkillGroupsService {
  constructor(@InjectRepository(SkillGroup) private repo: Repository<SkillGroup>) {}

  async findOne(id: number): Promise<SkillGroup> {
    const experience = await this.repo.findOneBy({ id });
    if (!experience) throw new NotFoundException('Record Not found');
    return experience;
  }

  async create(groupData: SkillGroupDto, profileId: number): Promise<SkillGroup> {
    const newRecord = this.repo.create(groupData);
    const profile = new Profile();
    profile.id = profileId;
    newRecord.profile = profile;
    return this.repo.save(newRecord);
  }

  async findAll(profileId: number): Promise<SkillGroup[]> {
    return this.repo.findBy({ profile: { id: profileId } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, newData: SkillGroupDto): Promise<SkillGroup> {
    const record = await this.findOne(id);
    const result = this.repo.save({ ...record, ...newData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }
}
