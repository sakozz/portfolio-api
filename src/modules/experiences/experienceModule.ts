import { Module } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from 'src/entities/experience.entity';
import { ExperiencesController } from './experiences.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Experience])],
  providers: [ExperiencesService],
  controllers: [ExperiencesController],
})
export class ExperienceModule {}
