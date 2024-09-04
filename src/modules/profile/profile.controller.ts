import { Body, Controller, Delete, Get, Post, Put, Req, Param } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import CreateProfileDto from './dto/create-profile.dto';
import { Request } from 'express';
import ProfileDto from './dto/profile.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import { Actions } from '../casl/casal-actions';
import { Require } from '../casl/abilities.decorator';
import { SkipJwtAuth } from 'src/decorators/skip-jwt-auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import SessionUser from 'src/types/common';
import { profileAbilityFactory } from './profile.abilities';

@Controller('profiles')
@Serialize(ProfileDto)
export class ProfileController {
  constructor(private service: ProfilesService) {}

  @Post('/')
  @Require(profileAbilityFactory(Actions.Create))
  createProfile(@Body() body: CreateProfileDto, @Req() req: Request) {
    const id = parseInt(req.user['id']);
    return this.service.create(body, id);
  }

  @Get('/')
  @Require(profileAbilityFactory(Actions.AccessCollection))
  getAllProfiles() {
    return this.service.findAll();
  }

  @Get('/own')
  @Require(profileAbilityFactory(Actions.Access))
  async getMyProfile(@CurrentUser('id') id: number) {
    const profile = await this.service.findByUserId(id);
    return profile;
  }

  @Get('/:username')
  @SkipJwtAuth()
  getProfileByUsername(@Param('username') username: string) {
    return this.service.findByUsername(username);
  }

  @Put('/:username')
  @Require(profileAbilityFactory(Actions.Update))
  updateProfile(
    @Param('username') username: string,
    @Body() payload: UpdateProfileDto,
    @CurrentUser() user: SessionUser,
  ) {
    return this.service.update(username, payload, user);
  }

  @Delete('/:id')
  @Require(profileAbilityFactory(Actions.Delete))
  deleteProfile(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
