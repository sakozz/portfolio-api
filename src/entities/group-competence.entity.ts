import { Entity, Column, JoinColumn, ManyToOne, OneToOne, RelationId } from 'typeorm';
import { BasicEntity } from './base.entity';
import { SkillGroup } from './skill-group.entity';
import { Competence } from './competence.entity';

/* A joint table between a skill group and a competence. */
@Entity()
export class GroupCompetence extends BasicEntity {
  @ManyToOne(() => SkillGroup, (group) => group.competences)
  @JoinColumn()
  group: SkillGroup;

  @OneToOne(() => Competence)
  @JoinColumn()
  competence: Competence;

  @RelationId((groupCompetence: GroupCompetence) => groupCompetence.competence)
  competenceId: number;

  @Column()
  level: number;
}
