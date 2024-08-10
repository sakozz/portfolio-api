import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';
import { Experience } from '../../../entities/experience.entity';
import { Profile } from '../../../entities/profile.entity';

@Injectable()
export class ExperiencesService {
  constructor(@InjectRepository(Experience) private repo: Repository<Experience>) {}

  async findOne(id: number): Promise<Experience> {
    const experience = await this.repo.findOneBy({ id });
    if (!experience) throw new NotFoundException('Record Not found');
    return experience;
  }

  async create(experienceData: CreateExperienceDto, profileId: number): Promise<Experience> {
    const newRecord = this.repo.create(experienceData);
    const profile = new Profile();
    profile.id = profileId;
    newRecord.profile = profile;
    return this.repo.save(newRecord);
  }

  async findAll(profileId: number): Promise<Experience[]> {
    return this.repo.findBy({ profile: { id: profileId } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, newData: UpdateExperienceDto): Promise<Experience> {
    const record = await this.findOne(id);
    const result = this.repo.save({ ...record, ...newData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }
}
