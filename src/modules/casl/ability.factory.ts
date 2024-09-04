import { MongoAbility } from '@casl/ability';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { Actions, Subjects } from './casal-actions';
import SessionUser from 'src/types/common';
import {
  ProfileCompetenceGroupAbilityCtx,
  profileCompetenceGroupAbilityFactory,
} from '../profile/profile-competence-groups/profile-competence-groups..ability';
import { EntityAbilities } from './abilities.decorator';
import { profileAbilities, ProfileAbilityCtx } from '../profile/profile.abilities';

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
      return profileCompetenceGroupAbilityFactory(this.ctx, user);
    }

    if (this.ctx && this.ctx instanceof ProfileAbilityCtx) {
      return profileAbilities(this.ctx, user);
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
