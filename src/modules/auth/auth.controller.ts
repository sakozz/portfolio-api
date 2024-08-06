import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/common/guards/local.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { consts } from 'src/config/constants';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from '../users/dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
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
}
