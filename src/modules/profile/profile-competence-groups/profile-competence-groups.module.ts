import { Module } from '@nestjs/common';
import { ProfileCompetenceGroupsService } from './profile-competence-groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileCompetenceGroupsController } from './profile-competence-groups.controller';
import { ProfileCompetenceGroup } from '../../../entities/profile-competence-group.entity';
import { GroupCompetence } from '../../../entities/group-competence.entity';
import { Competence } from '../../../entities/competence.entity';
import { AbilitiesModule } from 'src/modules/abilities/abilities.module';
import { Profile } from 'src/entities/profile.entity';
import { ProfileCompetenceGroupAbilityCtx } from './profile-competence-groups..ability';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile, ProfileCompetenceGroup, GroupCompetence, Competence]),
    AbilitiesModule,
  ],
  providers: [ProfileCompetenceGroupsService, ProfileCompetenceGroupAbilityCtx],
  controllers: [ProfileCompetenceGroupsController],
})
export class ProfileCompetenceGroupsModule {}
