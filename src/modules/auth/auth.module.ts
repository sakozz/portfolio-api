import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';

import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { Profile } from 'src/entities/profile.entity';
import { ProfilesService } from '../profile/profiles.service';
import { AbilitiesModule } from '../abilities/abilities.module';
import { InvitationsService } from '../invitations/invitations.service';
import { Invitation } from 'src/entities/invitation.entity';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Invitation]),
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
    InvitationsService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    ConfigService,
    ProfilesService,
  ],
})
export class AuthModule {}
