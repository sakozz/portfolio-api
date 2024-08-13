import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from 'src/modules/auth/guards/local.guard';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { consts } from 'src/config/constants';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';
import { GoogleAuthService } from './services/google-auth.service';
import { GoogleOauthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { User } from 'src/entities/user.entity';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
  ) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    const result = await this.authService.signupUser(body);
    return result;
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.cookie(consts.cookieName, req.user['token'], {
      expires: new Date(Date.now() + this.configService.get('auth.ttl') * 1000),
      httpOnly: true,
    });
    return req.user;
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return this.authService.profile(req.user['id']);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie(consts.cookieName, '', { expires: new Date(Date.now()) });
    return {};
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleLoginCallback(@Req() req: any, @Res() res: Response) {
    const user = await this.googleAuthService.validateUser(req.user);
    // If result is not Profile, it is Error
    if (!(user instanceof User)) {
      return user;
    }
    const payload = {
      authToken: req.user.accessToken,
      refreshToken: req.user.refreshToken,
      id: user.id,
      email: user.email,
    };

    this.authService.setCookie(res, payload);

    res.redirect(this.configService.get('auth.frontendCallbackUrl'));
  }
}
