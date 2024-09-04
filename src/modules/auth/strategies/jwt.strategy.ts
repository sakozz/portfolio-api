import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { consts } from 'src/config/constants';
import { ConfigService } from '@nestjs/config';
import SessionUser from 'src/types/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecret'),
    });
  }

  private static extractJWT(req: Request): string | null {
    const cookieName = consts.cookieName;
    if (req.cookies && cookieName in req.cookies && req.cookies[cookieName].length > 0) {
      return req.cookies[cookieName];
    }
    return null;
  }

  async validate(payload: SessionUser) {
    return new SessionUser(
      payload.authToken,
      payload.refreshToken,
      payload.id,
      payload.role,
      payload.email,
    );
  }
}
