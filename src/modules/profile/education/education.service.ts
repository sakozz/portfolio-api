import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateEducationDto from './dto/create-education.dto';
import UpdateEducationDto from './dto/update-education.dto';
import { Profile } from '../../../entities/profile.entity';
import { AbilityFactory } from 'src/modules/abilities/ability.factory';
import { Actions } from 'src/modules/abilities/abilities.actions';
import { newEducationAbilityCtx } from './education.abilities';
import { Education } from '../../../entities/education.entity';

@Injectable()
export class EducationService {
  constructor(
    private abilities: AbilityFactory,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Education) private repo: Repository<Education>,
  ) {}

  async findOne(id: number): Promise<Education> {
    const education = await this.repo.findOneBy({ id });
    if (!education) throw new NotFoundException('Record Not found');
    return education;
  }

  async create(
    educationData: CreateEducationDto,
    profileId: number,
    currentUserId: number,
  ): Promise<Education> {
    const newRecord = this.repo.create(educationData);
    const currentUserProfile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });
    newRecord.profileId = profileId;

    this.abilities.authorize(
      newEducationAbilityCtx(Actions.Create, newRecord, currentUserProfile.id),
    );
    const profile = new Profile();
    profile.id = profileId;
    newRecord.profile = profile;
    return this.repo.save(newRecord);
  }

  async findAll(profileId: number): Promise<Education[]> {
    return this.repo.findBy({ profile: { id: profileId } });
  }

  async delete(id: number, currentUserId: number): Promise<void> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(newEducationAbilityCtx(Actions.Delete, record, profile.id));

    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, newData: UpdateEducationDto, currentUserId: number): Promise<Education> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(newEducationAbilityCtx(Actions.Delete, record, profile.id));

    const result = this.repo.save({ ...record, ...newData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }
}
