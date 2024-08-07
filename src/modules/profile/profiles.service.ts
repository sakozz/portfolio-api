import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';

import { Repository } from 'typeorm';
import CreateProfileDto from './dto/create-profile.dto';
import { User } from 'src/entities/user.entity';
import UpdateProfileDto from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(@InjectRepository(Profile) private repo: Repository<Profile>) {}

  async findByUserId(userId: number): Promise<Profile> {
    const profile = await this.repo.findOneBy({ user: { id: userId } });
    if (!profile) throw new UnauthorizedException('Invalid session. Please login');
    return profile;
  }

  async findOne(id: number): Promise<Profile> {
    const profile = await this.repo.findOneBy({ id });
    if (!profile) throw new NotFoundException('Profile Not found');
    return profile;
  }

  async create(profileData: CreateProfileDto, userId: number): Promise<Profile> {
    const newProfile = this.repo.create(profileData);
    const user = new User();
    user.id = userId;
    newProfile.user = user;
    return this.repo.save(newProfile);
  }

  async findAll(): Promise<Profile[]> {
    return this.repo.find();
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.softDelete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, profileData: UpdateProfileDto): Promise<Profile> {
    const profile = await this.findOne(id);
    const result = this.repo.save({ ...profile, ...profileData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }
}
