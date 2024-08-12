import { Module } from '@nestjs/common';
import { ProfileCompetenceGroupsService } from './profile-competence-groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileCompetenceGroupsController } from './profile-competence-groups.controller';
import { ProfileCompetenceGroup } from '../../../entities/profile-competence-group.entity';
import { GroupCompetence } from '../../../entities/group-competence.entity';
import { Competence } from '../../../entities/competence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileCompetenceGroup, GroupCompetence, Competence])],
  providers: [ProfileCompetenceGroupsService],
  controllers: [ProfileCompetenceGroupsController],
})
export class ProfileCompetenceGroupsModule {}
