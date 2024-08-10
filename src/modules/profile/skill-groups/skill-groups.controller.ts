import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import SkillGroupDto from './dto/skill-group.dto';
import { SkillGroupsService } from './skill-groups.service';

@Controller('profiles/:profileId/skill-groups')
export class SkillGroupsController {
  constructor(private service: SkillGroupsService) {}

  @Post()
  create(@Body() body: SkillGroupDto, @Param('profileId') profileId: string) {
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
  update(@Param('id') id: string, @Body() payload: SkillGroupDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
