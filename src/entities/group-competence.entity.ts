import { Entity, Column, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { BasicEntity } from './base.entity';
import { ProfileCompetenceGroup } from './profile-competence-group.entity';
import { Competence } from './competence.entity';

/* A joint table between a skill group and a competence. */
@Entity()
export class GroupCompetence extends BasicEntity {
  @ManyToOne(() => ProfileCompetenceGroup, (group) => group.competences, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn()
  group: ProfileCompetenceGroup;

  @ManyToOne(() => Competence)
  @JoinColumn()
  competence: Competence;

  @RelationId((groupCompetence: GroupCompetence) => groupCompetence.competence)
  competenceId: number;

  @RelationId((groupCompetence: GroupCompetence) => groupCompetence.group)
  groupId: number;

  @Column()
  level: number;
}
