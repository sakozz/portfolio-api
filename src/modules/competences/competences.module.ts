import { Module } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetencesController } from './competences.controller';
import { Competence } from '../../entities/competence.entity';
import { AbilitiesModule } from '../casl/casl.module';
import { BaseService } from '../base/base.service';

@Module({
  imports: [TypeOrmModule.forFeature([Competence]), AbilitiesModule],
  providers: [CompetencesService, BaseService],
  controllers: [CompetencesController],
})
export class CompetencesModule {}
