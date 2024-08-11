import { Module } from '@nestjs/common';
import { SkillGroupsService } from './skill-groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillGroupsController } from './skill-groups.controller';
import { SkillGroup } from '../../../entities/skill-group.entity';
import { GroupCompetence } from '../../../entities/group-competence.entity';
import { Competence } from '../../../entities/competence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillGroup, GroupCompetence, Competence])],
  providers: [SkillGroupsService],
  controllers: [SkillGroupsController],
})
export class SkillGroupsModule {}
