import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Competence } from '../../entities/competence.entity';
import SaveCompetenceDto from './dto/save-competence.dto';

@Injectable()
export class CompetencesService {
  constructor(@InjectRepository(Competence) private repo: Repository<Competence>) {}

  async findOne(id: number): Promise<Competence> {
    const record = await this.repo.findOneBy({ id });
    if (!record) throw new NotFoundException('Record Not found');
    return record;
  }

  async create(payload: SaveCompetenceDto): Promise<Competence> {
    const newRecord = this.repo.create(payload);
    return this.repo.save(newRecord);
  }

  async findAll(): Promise<Competence[]> {
    return this.repo.find();
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, newData: SaveCompetenceDto): Promise<Competence> {
    const record = await this.findOne(id);
    const result = this.repo.save({ ...record, ...newData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }
}
