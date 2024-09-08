import { Entity, JoinColumn, Column, ManyToOne, RelationId } from 'typeorm';
import { BasicEntity } from './base.entity';
import { Profile } from './profile.entity';
import { consts } from '../config/constants';

@Entity()
export class Education extends BasicEntity {
  @ManyToOne(() => Profile, (profile) => profile.education)
  @JoinColumn()
  profile: Profile;

  @RelationId((education: Education) => education.profile)
  profileId: number;

  @Column({ length: consts.nameMaxLength })
  degreeProgram: string;

  @Column({ length: consts.nameMaxLength })
  university: string;

  @Column({ length: consts.linkMaxLength, nullable: true })
  link: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate: string;

  @Column({ type: 'boolean', nullable: true, default: false })
  completed: boolean;
}
