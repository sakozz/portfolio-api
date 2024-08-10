import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntity } from './base.entity';
import { Profile } from './profile.entity';
import { consts } from '../config/constants';

@Entity()
export class SkillGroup extends BasicEntity {
  @ManyToOne(() => Profile, (profile) => profile.skillGroups)
  @JoinColumn()
  profile: Profile;

  @Column({ length: consts.nameMaxLength })
  name: string;

  @Column({ length: consts.descriptionMaxLength })
  description: string;
}
