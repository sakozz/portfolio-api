import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { Profile } from 'src/entities/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesService } from './profiles.service';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfilesService],
})
export class ProfileModule {}
