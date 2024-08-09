import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards, Param } from '@nestjs/common';

import { ProfilesService } from './profiles.service';
import CreateProfileDto from './dto/create-profile.dto';

import { Request } from 'express';
import ProfileDto from './dto/profile.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import UpdateProfileDto from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
@Serialize(ProfileDto)
export class ProfileController {
  constructor(private service: ProfilesService) {}

  @Post('/')
  createProfile(@Body() body: CreateProfileDto, @Req() req: Request) {
    const id = parseInt(req.user['id']);
    return this.service.create(body, id);
  }

  @Get('/')
  getAllProfiles() {
    return this.service.findAll();
  }

  @Get('/own')
  async getMyProfile(@Req() req: Request) {
    const id = parseInt(req.user['id']);
    const profile = await this.service.findByUserId(id);
    return profile;
  }

  @Get('/:id')
  getProfileById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  updateProfile(@Param('id') id: string, @Body() payload: UpdateProfileDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  deleteProfile(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
