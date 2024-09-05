import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { Profile } from 'src/entities/profile.entity';
import { ProfilesService } from '../profile/profiles.service';
import { AbilitiesModule } from '../abilities/abilities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.jwtSecret'),
        signOptions: { expiresIn: configService.get('auth.ttl') },
      }),
      inject: [ConfigService],
    }),
    AbilitiesModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleAuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    ConfigService,
    ProfilesService,
  ],
})
export class AuthModule {}
