import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleAuthService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
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
    if (!user) {
      const user = this.repo.create({ email: email, role: 'manager', password: accessToken });
      const userResult = await this.repo.save(user);
      const newProfile = this.profileRepo.create({
        email,
        firstName,
        lastName,
        avatarUrl,
      });

      newProfile.user = userResult;
      await this.profileRepo.save(newProfile);
      return user;
    }

    // If user exists, create or update the profile with new information.
    const profile = await this.profileRepo.findOneBy({ email });
    if (profile) {
      await this.profileRepo.update(user.id, { firstName, lastName, avatarUrl });
      return user;
    }

    const newProfile = this.profileRepo.create({ email, firstName, lastName, avatarUrl });
    const profileResult = await this.profileRepo.save(newProfile);

    if (profileResult) {
      throw new UnprocessableEntityException('Failed to create user profile');
    }

    return user;
  }
}
