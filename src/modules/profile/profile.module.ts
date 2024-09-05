import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { Profile } from 'src/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';
import { ProfileAbilityCtx } from './profile.abilities';
import { AbilitiesModule } from '../abilities/abilities.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile]), AbilitiesModule],
  controllers: [ProfileController],
  providers: [ProfilesService, ProfileAbilityCtx],
})
export class ProfileModule {}
