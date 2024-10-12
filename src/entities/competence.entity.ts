import { Entity, Column } from 'typeorm';
import { BasicEntity } from './base.entity';
import { consts } from '../config/constants';

@Entity()
export class Competence extends BasicEntity {
  @Column({ length: consts.nameMaxLength, unique: true })
  name: string;

  @Column({ length: consts.descriptionMaxLength, nullable: true })
  description: string;
}
