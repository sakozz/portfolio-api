import { Entity, Column, DeleteDateColumn } from 'typeorm';
import { BasicEntity } from './base.entity';

@Entity()
export class User extends BasicEntity {
  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 300 })
  password: string;

  @Column({ length: 50 })
  role: string;

  @Column({
    default: false,
    nullable: true,
  })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
