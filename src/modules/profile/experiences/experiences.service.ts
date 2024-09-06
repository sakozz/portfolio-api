import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';
import { Experience } from '../../../entities/experience.entity';
import { Profile } from '../../../entities/profile.entity';
import { AbilityFactory } from 'src/modules/abilities/ability.factory';
import { newExperiencesAbilityCtx } from './experiences.abilities';
import { Actions } from 'src/modules/abilities/abilities.actions';

@Injectable()
export class ExperiencesService {
  constructor(
    private abilities: AbilityFactory,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Experience) private repo: Repository<Experience>,
  ) {}

  async findOne(id: number): Promise<Experience> {
    const experience = await this.repo.findOneBy({ id });
    if (!experience) throw new NotFoundException('Record Not found');
    return experience;
  }

  async create(
    experienceData: CreateExperienceDto,
    profileId: number,
    currentUserId,
  ): Promise<Experience> {
    const newRecord = this.repo.create(experienceData);
    const currentUserProfile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });
    newRecord.profileId = profileId;

    this.abilities.authorize(
      newExperiencesAbilityCtx(Actions.Create, newRecord, currentUserProfile.id),
    );
    const profile = new Profile();
    profile.id = profileId;
    newRecord.profile = profile;
    return this.repo.save(newRecord);
  }

  async findAll(profileId: number): Promise<Experience[]> {
    return this.repo.findBy({ profile: { id: profileId } });
  }

  async remove(id: number, currentUserId: number): Promise<void> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(newExperiencesAbilityCtx(Actions.Delete, record, profile.id));

    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(
    id: number,
    newData: UpdateExperienceDto,
    currentUserId: number,
  ): Promise<Experience> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(newExperiencesAbilityCtx(Actions.Delete, record, profile.id));

    const result = this.repo.save({ ...record, ...newData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }
}
