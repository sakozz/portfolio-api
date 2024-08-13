import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import SaveCompetenceDto from './dto/save-competence.dto';
import { Serialize } from '../../common/interceptors/serialize.interceptor';
import CompetenceDto from './dto/competence.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('competences')
@UseGuards(JwtAuthGuard)
@Serialize(CompetenceDto)
export class CompetencesController {
  constructor(private service: CompetencesService) {}

  @Post()
  create(@Body() body: SaveCompetenceDto) {
    return this.service.create(body);
  }
  @Get()
  getList() {
    return this.service.findAll();
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() payload: SaveCompetenceDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
