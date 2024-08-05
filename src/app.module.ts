import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConfig } from './db/config';
import { User } from './entities/user.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      // envFilePath: ['.env.development.local', '.env.test', '.env.production'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => postgresConfig(config, [User]),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
