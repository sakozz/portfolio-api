import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationController } from './education.controller';
import { AbilitiesModule } from 'src/modules/abilities/abilities.module';
import { Profile } from 'src/entities/profile.entity';
import { Education } from '../../../entities/education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education, Profile]), AbilitiesModule],
  providers: [EducationService],
  controllers: [EducationController],
})
export class EducationModule {}
