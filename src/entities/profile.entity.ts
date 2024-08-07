import { Entity, Column, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { BasicEntity } from './base.entity';

@Entity()
export class Profile extends BasicEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 150, nullable: true })
  linkedInUrl: string;

  @Column({ length: 150, nullable: true })
  githubUrl: string;

  @Column({ length: 150, nullable: true })
  facebookUrl: string;

  @Column({ length: 150, nullable: true })
  stackoverflowUrl: string;

  @Column({ length: 3000 })
  description: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
