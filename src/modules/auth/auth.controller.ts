import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/modules/auth/guards/local.guard';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { consts } from 'src/config/constants';
import { UserDto } from '../users/dtos/user.dto';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { User } from 'src/entities/user.entity';
import SessionUser from 'src/types/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { SkipJwtAuth } from 'src/decorators/skip-jwt-auth.decorator';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
  ) {}
  /* 
  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const result = await this.authService.signupUser(body);
    return result;
  }
*/
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie(consts.cookieName, req.user['token'], {
      expires: new Date(Date.now() + this.configService.get('auth.ttl') * 1000),
      httpOnly: true,
    });
    return req.user;
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie(consts.cookieName, '', { expires: new Date(Date.now()) });
    return {};
  }

  @Get('google')
  @SkipJwtAuth()
  @UseGuards(GoogleOauthGuard)
  googleLogin() {}

  @Get('google/callback')
  @SkipJwtAuth()
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(@Req() req: any, @Res() res: Response) {
    const user = await this.googleAuthService.validateUser(req.user);
    // If result is not Profile, it is Error
    if (user instanceof User) {
      const payload: SessionUser = {
        authToken: req.user.accessToken,
        refreshToken: req.user.refreshToken,
        id: user.id,
        role: user.role,
        email: user.email,
      } as SessionUser;

      this.authService.setCookie(res, payload);

      res.redirect(this.configService.get('auth.frontendCallbackUrl'));
    }

    res.redirect(this.configService.get('auth.frontendCallbackUrl') + '?erro=true');
  }
}
