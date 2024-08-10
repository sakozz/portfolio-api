import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CompetenceDto from './dto/competence.dto';
import { CompetencesService } from './competences.service';

@Controller('competences')
export class CompetencesController {
  constructor(private service: CompetencesService) {}

  @Post()
  create(@Body() body: CompetenceDto) {
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
  update(@Param('id') id: string, @Body() payload: CompetenceDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
