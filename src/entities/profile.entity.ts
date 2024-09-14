import {
  Entity,
  Column,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { BasicEntity } from './base.entity';
import { Experience } from './experience.entity';
import { Education } from './education.entity';
import { ProfileCompetenceGroup } from './profile-competence-group.entity';
import { Role } from 'src/types/roles';

@Entity()
export class Profile extends BasicEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Experience, (experience) => experience.profile)
  experiences: Experience[];

  @OneToMany(() => Education, (education) => education.profile)
  education: Education[];

  @OneToMany(() => ProfileCompetenceGroup, (group) => group.profile)
  skillGroups: ProfileCompetenceGroup[];

  @RelationId((profile: Profile) => profile.user)
  userId: number;

  @Column({ length: 50 })
  role: Role;

  @Column({ length: 100 })
  jobTitle: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 16, nullable: true })
  phone: string;

  @Column({ length: 1000, nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  nationality: string;

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

  @Column({ length: 3000, nullable: true })
  description: string;

  @Column({ length: 500, nullable: true })
  avatarUrl: string;

  @DeleteDateColumn()
  deletedAt: Date;
}
