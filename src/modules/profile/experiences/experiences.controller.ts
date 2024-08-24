import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

import ExperienceCollectionDto from './dto/experience-collection.dto';
import ExperienceItemDto from './dto/experience-item.dto';

@Controller('profiles/:profileId/experiences')
@UseGuards(JwtAuthGuard)
export class ExperiencesController {
  constructor(private service: ExperiencesService) {}

  @Post()
  create(@Body() body: CreateExperienceDto, @Param('profileId') profileId: string) {
    return this.service.create(body, parseInt(profileId));
  }

  @Get()
  @Serialize(ExperienceCollectionDto)
  async getAllExperiences(@Param('profileId') profileId: string) {
    const result = await this.service.findAll(parseInt(profileId));
    return { items: result, totalCount: result.length };
  }

  @Get(':id')
  @Serialize(ExperienceItemDto)
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
