import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SkillGroupsService } from './skill-groups.service';
import SaveProfileCompetenceGroupDto from './dto/save-profile-competence-group.dto';
import { Serialize } from '../../../common/interceptors/serialize.interceptor';
import ProfileCompetenceGroupDto from './dto/profile-competence-group.dto';

@Controller('profiles/:profileId/skill-groups')
@Serialize(ProfileCompetenceGroupDto)
export class SkillGroupsController {
  constructor(private service: SkillGroupsService) {}

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
