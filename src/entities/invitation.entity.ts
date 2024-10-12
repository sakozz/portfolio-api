import { Entity, Column, DeleteDateColumn } from 'typeorm';
import { BasicEntity } from './base.entity';
import { Role } from 'src/types/roles';

@Entity()
export class Invitation extends BasicEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  token: string;

  @Column({ nullable: false, default: 'manager' })
  role: Role;

  @Column({ type: 'date', nullable: false })
  expiresAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
