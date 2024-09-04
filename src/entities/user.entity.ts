import { Entity, Column, DeleteDateColumn } from 'typeorm';
import { BasicEntity } from './base.entity';
import { Role } from 'src/types/roles';

@Entity()
export class User extends BasicEntity {
  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 300 })
  password: string;

  @Column({ length: 50 })
  role: Role;

  @Column({
    default: false,
    nullable: true,
  })
  isActive: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  isAdmin() {
    return this.role == 'admin';
  }
}
