import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { AbilitiesModule } from 'src/modules/abilities/abilities.module';
import { Profile } from 'src/entities/profile.entity';
import { Project } from '../../../entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Profile]), AbilitiesModule],
  providers: [ProjectsService],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
