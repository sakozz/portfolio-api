import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { ProfilesService } from 'src/modules/profile/profiles.service';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import CreateProfileDto from 'src/modules/profile/dto/create-profile.dto';

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    private configService: ConfigService,
    private profilesService: ProfilesService,
  ) {}

  async revokeGoogleToken(token: string) {
    try {
      await axios.get(`https://accounts.google.com/o/oauth2/revoke?token=${token}`);
    } catch (error) {
      console.error('Failed to revoke the token:', error);
    }
  }

  async validateUser({ email, firstName, lastName, avatarUrl, accessToken }): Promise<User> {
    // Check if user exists and create if not.
    const user = await this.repo.findOneBy({ email });
    const username = await this.profilesService.generateUsername([firstName, lastName].join('-'));
    if (!user) {
      const user = this.repo.create({
        email: email,
        role: this.configService.get('defaultUserRole'),
        password: accessToken,
      });
      const userResult = await this.repo.save(user);
      const profileDto = plainToInstance(CreateProfileDto, {
        username: username,
        email,
        firstName,
        lastName,
        avatarUrl,
        role: user.role,
      });

      await this.profilesService.create(profileDto, userResult.id);
      return user;
    }

    // If user exists, create or update only the profile with new information.
    const profile = await this.profileRepo.findOneBy({ email });
    if (profile) {
      await this.profileRepo.update(user.id, {
        firstName,
        lastName,
        avatarUrl,
      });
      return user;
    }

    const newProfile = this.profileRepo.create({
      email,
      firstName,
      lastName,
      avatarUrl,
      username,
      jobTitle: 'Candidate',
      user: user,
      role: user.role,
    });
    const profileResult = await this.profileRepo.save(newProfile);

    if (!profileResult) {
      throw new UnprocessableEntityException('Failed to create user profile');
    }

    return user;
  }
}
