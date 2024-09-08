import { MongoAbility } from '@casl/ability';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { Actions, Subjects } from './abilities.actions';
import SessionUser from 'src/types/common';
import {
  profileCompetenceGroupAbilities,
  ProfileCompetenceGroupAbilityCtx,
} from '../profile/profile-competence-groups/profile-competence-groups..ability';
import { EntityAbilities } from './abilities.decorator';
import { profileAbilities, ProfileAbilityCtx } from '../profile/profile.abilities';
import { competenceAbilities, CompetencesAbilityCtx } from '../competences/competences.abilities';
import {
  experiencesAbilities,
  ExperiencesAbilityCtx,
} from '../profile/experiences/experiences.abilities';
import { projectsAbilities, ProjectsAbilityCtx } from '../profile/projects/projects.abilities';
import { educationAbilities, EducationAbilityCtx } from '../profile/education/education.abilities';

export type AppAbility = MongoAbility<[Actions, Subjects]>;

@Injectable()
export class AbilityCtx {
  action: Actions;
  subject?: Subjects;
}

@Injectable()
export class AbilityFactory implements EntityAbilities {
  subject: Subjects;
  action: Actions;
  constructor(public ctx: AbilityCtx) {
    this.action = ctx.action;
    this.subject = ctx.subject;
  }

  defineAbilities(user?: SessionUser): AppAbility {
    if (this.ctx && this.ctx instanceof ProfileCompetenceGroupAbilityCtx) {
      return profileCompetenceGroupAbilities(this.ctx, user);
    }

    if (this.ctx && this.ctx instanceof ProfileAbilityCtx) {
      return profileAbilities(this.ctx, user);
    }

    if (this.ctx && this.ctx instanceof CompetencesAbilityCtx) {
      return competenceAbilities(this.ctx, user);
    }

    if (this.ctx && this.ctx instanceof ExperiencesAbilityCtx) {
      return experiencesAbilities(this.ctx, user);
    }

    if (this.ctx && this.ctx instanceof ProjectsAbilityCtx) {
      return projectsAbilities(this.ctx, user);
    }

    if (this.ctx && this.ctx instanceof EducationAbilityCtx) {
      return educationAbilities(this.ctx, user);
    }
  }

  authorize(ctx: AbilityCtx) {
    this.ctx = ctx;
    this.action = ctx.action;
    this.subject = ctx.subject;
    const ability = this.defineAbilities();
    const permitted = ability.can(this.action, this.subject);
    if (!permitted) {
      throw new ForbiddenException('You are not authorized to perform this action');
    }
    return true;
  }
}
