import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileCompetenceGroupsService } from './profile-competence-groups.service';
import SaveProfileCompetenceGroupDto from './dto/save-profile-competence-group.dto';

import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import ProfileCompetenceGroupItemDto, {
  ProfileCompetenceGroupCollectionDto,
} from './dto/profile-competence-group.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('profiles/:profileId/competence-groups')
export class ProfileCompetenceGroupsController {
  constructor(private service: ProfileCompetenceGroupsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Serialize(ProfileCompetenceGroupItemDto)
  create(@Body() body: SaveProfileCompetenceGroupDto, @Param('profileId') profileId: string) {
    return this.service.create(body, parseInt(profileId));
  }

  @Get()
  @Serialize(ProfileCompetenceGroupCollectionDto)
  async getByProfileId(@Param('profileId') profileId: string) {
    const result = await this.service.findAll(parseInt(profileId));
    return { items: result, totalCount: result.length };
  }

  @Get(':id')
  @Serialize(ProfileCompetenceGroupItemDto)
  getById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @Serialize(ProfileCompetenceGroupItemDto)
  update(@Param('id') id: string, @Body() payload: SaveProfileCompetenceGroupDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
