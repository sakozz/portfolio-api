import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalGuard } from 'src/common/guards/local.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { configs } from 'src/config/consts';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    console.log(req.user);
    res.cookie(configs.cookieName, req.user, {
      expires: new Date(Date.now() + this.configService.get('auth.ttl') * 1000),
      httpOnly: true,
    });
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('Inside AuthController status method');
    return req.user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.cookie(configs.cookieName, '', { expires: new Date(Date.now()) });
    return {};
  }
}
