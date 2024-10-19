import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateInvitationDto from './dto/create-invitation.dto';
import { Invitation } from 'src/entities/invitation.entity';
import UpdateInvitationDto from './dto/update-invitation.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { isBefore } from 'date-fns';

export type FilterParams = {
  sort?: string;
  size?: number;
  page?: number;
  filter?: Record<string, unknown>;
};

@Injectable()
export class InvitationsService {
  constructor(
    @InjectRepository(Invitation) private repo: Repository<Invitation>,
    private configService: ConfigService,
  ) {}

  async findOne(id: number): Promise<Invitation> {
    const record = await this.repo.findOneBy({ id });
    if (!record) throw new NotFoundException('Record Not found');
    return record;
  }

  async hasValidInvitation(email: string): Promise<boolean> {
    if (this.isAdminEmail(email)) return true;

    const record = await this.repo.findOneBy({ email });
    if (!record) return false;

    const isExpired = isBefore(record.expiresAt, new Date());
    return !isExpired;
  }

  isAdminEmail(email: string): boolean {
    return email == this.configService.get('auth.adminEmail');
  }

  async create(payload: CreateInvitationDto): Promise<Invitation> {
    // Generate and set token
    const salt = await bcrypt.genSalt(10);
    payload.token = await bcrypt.hash(payload.email, salt);

    //Set expires at
    payload.expiresAt = new Date(Date.now() + this.configService.get('auth.ttl') * 1000);

    const newRecord = this.repo.create(payload);
    return this.repo.save(newRecord);
  }

  async findAll(params) {
    return this.filteredList(this.repo, params);
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.softDelete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, newData: UpdateInvitationDto): Promise<Invitation> {
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
