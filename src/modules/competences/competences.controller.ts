import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import SaveCompetenceDto from './dto/save-competence.dto';

import CompetenceItemDto, { CompetenceCollectionDto } from './dto/competence.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { Require } from '../casl/abilities.decorator';
import { Actions } from '../casl/casal-actions';
import { Competence } from 'src/entities/competence.entity';
import SessionUser from 'src/types/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('competences')
export class CompetencesController {
  constructor(private service: CompetencesService) {}

  @Post()
  //@Require({ action: Actions.Create, subject: Competence })
  @UseGuards(JwtAuthGuard)
  create(@Body() body: SaveCompetenceDto) {
    return this.service.create(body);
  }

  @Get()
  // @Require({ action: Actions.Access, subject: Competence })
  @Serialize(CompetenceCollectionDto)
  getList(@Req() req: Request) {
    return this.service.findAll(req.query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @Require({ action: Actions.Access, subject: Competence })
  @Serialize(CompetenceItemDto)
  getById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  // @Require({ action: Actions.Update, subject: Competence })
  update(@Param('id') id: string, @Body() payload: SaveCompetenceDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  // @Require({ action: Actions.Delete, subject: Competence })
  delete(@Param('id') id: string, @CurrentUser() user: SessionUser) {
    return this.service.remove(parseInt(id), user);
  }
}
