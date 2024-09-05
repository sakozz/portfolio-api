import { InferSubjects } from '@casl/ability';
import { Competence } from 'src/entities/competence.entity';
import { Education } from 'src/entities/education.entity';
import { Experience } from 'src/entities/experience.entity';
import { GroupCompetence } from 'src/entities/group-competence.entity';
import { ProfileCompetenceGroup } from 'src/entities/profile-competence-group.entity';
import { Profile } from 'src/entities/profile.entity';
import { User } from 'src/entities/user.entity';
import SessionUser from 'src/types/common';

export enum Actions {
  Manage = 'manage',
  Create = 'create',
  Access = 'access',
  AccessCollection = 'accessCollection',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects =
  | InferSubjects<
      | typeof Profile
      | typeof User
      | typeof Competence
      | typeof Education
      | typeof Experience
      | typeof GroupCompetence
      | typeof ProfileCompetenceGroup
      | typeof SessionUser
    >
  | 'all';
