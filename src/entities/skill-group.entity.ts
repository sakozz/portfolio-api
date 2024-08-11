import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasicEntity } from './base.entity';
import { Profile } from './profile.entity';
import { consts } from '../config/constants';
import { GroupCompetence } from './group-competence.entity';

@Entity()
export class SkillGroup extends BasicEntity {
  @ManyToOne(() => Profile, (profile) => profile.skillGroups)
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => GroupCompetence, (competence) => competence.group)
  competences: GroupCompetence[];

  @Column({ length: consts.nameMaxLength })
  name: string;

  @Column({ length: consts.descriptionMaxLength })
  description: string;
}
