import { Entity, JoinColumn, Column, ManyToOne } from 'typeorm';
import { BasicEntity } from './base.entity';
import { Profile } from './profile.entity';
import { consts } from '../config/constants';

@Entity()
export class Education extends BasicEntity {
  @ManyToOne(() => Profile, (profile) => profile.educations)
  @JoinColumn()
  profile: Profile;

  @Column({ length: consts.nameMaxLength })
  degreeProgram: string;

  @Column({ length: consts.nameMaxLength })
  university: string;

  @Column({ length: consts.linkMaxLength, nullable: true })
  link: string;

  @Column({ type: 'date' })
  startDate: boolean;

  @Column({ type: 'date', nullable: true })
  endDate: boolean;

  @Column({ type: 'boolean', nullable: true, default: false })
  isCurrent: boolean;
}
