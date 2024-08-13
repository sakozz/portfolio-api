import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileCompetenceGroupsService } from './profile-competence-groups.service';
import SaveProfileCompetenceGroupDto from './dto/save-profile-competence-group.dto';
import { Serialize } from '../../../common/interceptors/serialize.interceptor';
import ProfileCompetenceGroupDto from './dto/profile-competence-group.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@Controller('profiles/:profileId/competence-groups')
@UseGuards(JwtAuthGuard)
@Serialize(ProfileCompetenceGroupDto)
export class ProfileCompetenceGroupsController {
  constructor(private service: ProfileCompetenceGroupsService) {}

  @Post()
  create(@Body() body: SaveProfileCompetenceGroupDto, @Param('profileId') profileId: string) {
    return this.service.create(body, parseInt(profileId));
  }

  @Get()
  getByProfileId(@Param('profileId') profileId: string) {
    return this.service.findAll(parseInt(profileId));
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: SaveProfileCompetenceGroupDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
