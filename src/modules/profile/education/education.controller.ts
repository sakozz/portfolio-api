import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EducationService } from './education.service';
import CreateEducationDto from './dto/create-education.dto';
import UpdateEducationDto from './dto/update-education.dto';
import EducationItemDto, { EducationCollectionDto } from './dto/education.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Require } from 'src/modules/abilities/abilities.decorator';
import { Actions } from 'src/modules/abilities/abilities.actions';
import { SkipJwtAuth } from 'src/decorators/skip-jwt-auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { educationAbilityFactory } from './education.abilities';

@Controller('profiles/:profileId/education')
export class EducationController {
  constructor(private service: EducationService) {}

  @Post()
  // Authorize implemented in service level
  @Serialize(EducationItemDto)
  create(
    @Body() body: CreateEducationDto,
    @Param('profileId') profileId: string,
    @CurrentUser('id') currentUserId: number,
  ) {
    return this.service.create(body, parseInt(profileId), currentUserId);
  }

  @Get()
  @SkipJwtAuth()
  @Require(educationAbilityFactory(Actions.AccessCollection))
  @Serialize(EducationCollectionDto)
  async getProfileEducation(@Param('profileId') profileId: string) {
    const result = await this.service.findAll(parseInt(profileId));
    return { items: result, totalCount: result.length };
  }

  @Get(':id')
  @Require(educationAbilityFactory(Actions.Access))
  @Serialize(EducationItemDto)
  getEducationById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  // Authorize implemented in service level
  updateProject(
    @Param('id') id: string,
    @Body() payload: UpdateEducationDto,
    @CurrentUser('id') currentUserId: number,
  ) {
    return this.service.update(parseInt(id), payload, currentUserId);
  }

  @Delete('/:id')
  // Authorize implemented in service level
  delete(@Param('id') id: string, @CurrentUser('id') currentUserId: number) {
    return this.service.delete(parseInt(id), currentUserId);
  }
}
