import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';

@Controller('profiles/:profileId/experiences')
export class ExperiencesController {
  constructor(private service: ExperiencesService) {}

  @Post()
  create(@Body() body: CreateExperienceDto, @Param('profileId') profileId: string) {
    return this.service.create(body, parseInt(profileId));
  }

  @Get()
  getAllExperiences(@Param('profileId') profileId: string) {
    return this.service.findAll(parseInt(profileId));
  }

  @Get(':id')
  getExperienceById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  updateExperience(@Param('id') id: string, @Body() payload: UpdateExperienceDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
