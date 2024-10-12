import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import CreateExperienceDto from './dto/create-experience.dto';
import UpdateExperienceDto from './dto/update-experience.dto';
import ExperienceCollectionDto from './dto/experience-collection.dto';
import ExperienceItemDto from './dto/experience-item.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Require } from 'src/modules/abilities/abilities.decorator';
import { experiencesAbilityFactory } from './experiences.abilities';
import { Actions } from 'src/modules/abilities/abilities.actions';
import { SkipJwtAuth } from 'src/decorators/skip-jwt-auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Controller('profiles/:profileId/experiences')
export class ExperiencesController {
  constructor(private service: ExperiencesService) {}

  @Post()
  // Authorize implemented in service level
  create(
    @Body() body: CreateExperienceDto,
    @Param('profileId') profileId: string,
    @CurrentUser('id') currentUserId: number,
  ) {
    return this.service.create(body, parseInt(profileId), currentUserId);
  }

  @Get()
  @SkipJwtAuth()
  @Require(experiencesAbilityFactory(Actions.AccessCollection))
  @Serialize(ExperienceCollectionDto)
  async getAllExperiences(@Param('profileId') profileId: string) {
    const result = await this.service.findAll(parseInt(profileId));
    return { items: result, totalCount: result.length };
  }

  @Get(':id')
  @Require(experiencesAbilityFactory(Actions.Access))
  @Serialize(ExperienceItemDto)
  getExperienceById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  // Authorize implemented in service level
  updateExperience(
    @Param('id') id: string,
    @Body() payload: UpdateExperienceDto,
    @CurrentUser('id') currentUserId: number,
  ) {
    return this.service.update(parseInt(id), payload, currentUserId);
  }

  @Delete('/:id')
  // Authorize implemented in service level
  delete(@Param('id') id: string, @CurrentUser('id') currentUserId: number) {
    return this.service.remove(parseInt(id), currentUserId);
  }
}
