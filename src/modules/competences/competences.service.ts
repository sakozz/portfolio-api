import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Competence } from '../../entities/competence.entity';
import SaveCompetenceDto from './dto/save-competence.dto';

export type FilterParams = {
  sort?: string;
  size?: number;
  page?: number;
  filter?: Record<string, unknown>;
};

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

  async findAll(params) {
    console.log(params);
    return this.filteredList(this.repo, params);
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

  async filteredList(repo: Repository<unknown>, params: FilterParams) {
    const builder = repo.createQueryBuilder();
    const page = params.page ? +params.page : 1;
    const size = params.size ? +params.size : 10;
    const sortAttrs = params.sort ? params.sort.split(',') : ['-updated_at'];

    sortAttrs.forEach((sortAttr, index) => {
      let attr = sortAttr;
      let order: 'ASC' | 'DESC' = 'ASC';
      if (sortAttr.startsWith('-')) {
        order = 'DESC';
        attr = sortAttr.substring(1, sortAttr.length);
      }

      // We need to use addOrderBy for first attr and every other attr we use addAddOrderBy
      index == 0 ? builder.orderBy(attr, order) : builder.addOrderBy(attr, order);
    });

    const filters = params.filter || {};
    Object.keys(filters).forEach((key) => {
      const [attr, opt] = key.split('__');
      const value = filters[key];
      let params = { [attr]: value };
      if (opt === 'eq') {
        builder.andWhere(`${attr} = :${attr}`, params);
      }

      if (opt === 'match') {
        params = { [attr]: `%${value}%` };
        builder.andWhere(`${attr} ILIKE :${attr}`, params);
      }

      if (opt === 'in') {
        params = { [attr]: value.toString().split(',') };
        builder.andWhere(`${attr} IN (:...${attr})`, params);
      }
    });

    const total = await builder.getCount();
    builder.offset((page - 1) * size).limit(size);

    return {
      items: await builder.getMany(),
      total: total,
      page: page,
      size: size,
    };
  }
}
