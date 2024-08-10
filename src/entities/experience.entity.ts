import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntity } from './base.entity';
import { Profile } from './profile.entity';
import { consts } from '../config/constants';

@Entity()
export class Experience extends BasicEntity {
  @ManyToOne(() => Profile, (profile) => profile.experiences)
  @JoinColumn()
  profile: Profile;

  @Column({ length: consts.nameMaxLength })
  jobTitle: string;

  @Column({ length: consts.descriptionMaxLength })
  responsibilities: string;

  @Column({ length: consts.nameMaxLength })
  companyName: string;

  @Column({ length: consts.linkMaxLength, nullable: true })
  link: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  isCurrent: boolean;
}
