import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from 'src/entities/experience.entity';
import { ExperiencesController } from './experiences.controller';
import { AbilitiesModule } from 'src/modules/abilities/abilities.module';
import { Profile } from 'src/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Experience, Profile]), AbilitiesModule],
  providers: [ExperiencesService],
  controllers: [ExperiencesController],
})
export class ExperienceModule {}
