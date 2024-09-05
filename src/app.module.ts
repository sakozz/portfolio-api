import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExperienceModule } from './modules/profile/experiences/experience.module';
import { ProfileCompetenceGroupsModule } from './modules/profile/profile-competence-groups/profile-competence-groups.module';
import { CompetencesModule } from './modules/competences/competences.module';
import postgresConfig from './db/db.config';
import { AbilitiesGuard } from './modules/abilities/abilities.guard';
import { AbilitiesModule } from './modules/abilities/abilities.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt.guard';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProfileModule,
    ExperienceModule,
    ProfileCompetenceGroupsModule,
    CompetencesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => postgresConfig(),
    }),
    AbilitiesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_GUARD', useClass: JwtAuthGuard },
    { provide: 'APP_GUARD', useClass: AbilitiesGuard },
  ],
})
export class AppModule {}
