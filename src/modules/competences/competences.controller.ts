import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import SaveCompetenceDto from './dto/save-competence.dto';

import CompetenceItemDto, { CompetenceCollectionDto } from './dto/competence.dto';
import { Request } from 'express';
import { Require } from '../abilities/abilities.decorator';
import { Actions } from '../abilities/abilities.actions';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { competencesAbilityFactory } from './competences.abilities';
import { SkipJwtAuth } from 'src/decorators/skip-jwt-auth.decorator';

@Controller('competences')
export class CompetencesController {
  constructor(private service: CompetencesService) {}

  @Post()
  @Require(competencesAbilityFactory(Actions.Create))
  create(@Body() body: SaveCompetenceDto) {
    return this.service.create(body);
  }

  @Get()
  @SkipJwtAuth()
  @Require(competencesAbilityFactory(Actions.AccessCollection))
  @Serialize(CompetenceCollectionDto)
  getList(@Req() req: Request) {
    return this.service.findAll(req.query);
  }

  @Get(':id')
  @Require(competencesAbilityFactory(Actions.Access))
  @Serialize(CompetenceItemDto)
  getById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  @Require(competencesAbilityFactory(Actions.Update))
  update(@Param('id') id: string, @Body() payload: SaveCompetenceDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  @Require(competencesAbilityFactory(Actions.Delete))
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
