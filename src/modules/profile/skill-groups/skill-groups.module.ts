import { Module } from '@nestjs/common';
import { SkillGroupsService } from './skill-groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillGroupsController } from './skill-groups.controller';
import { SkillGroup } from '../../../entities/skill-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SkillGroup])],
  providers: [SkillGroupsService],
  controllers: [SkillGroupsController],
})
export class SkillGroupsModule {}
