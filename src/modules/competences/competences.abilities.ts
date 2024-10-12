import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { Actions } from '../abilities/abilities.actions';
import { AbilityCtx, AbilityFactory, AppAbility } from '../abilities/ability.factory';
import SessionUser from 'src/types/common';
import { Subjects } from 'src/modules/abilities/abilities.actions';
import { Competence } from 'src/entities/competence.entity';

@Injectable()
export class CompetencesAbilityCtx implements AbilityCtx {
  action: Actions;
  subject?: Subjects = Competence;
  userId?: number;
}

/** Use this function to avoid injecting Types and interfaces to constructor. Because DI will complain when used with constructor */
export const newCompetencesAbilityCtx = (action: Actions, subject: Subjects) => {
  const ctx = new CompetencesAbilityCtx();
  ctx.action = action;
  ctx.subject = subject;
  return ctx;
};

export function competencesAbilityFactory(
  action: Actions,
  subject: Subjects = Competence,
): AbilityFactory {
  const ctx = newCompetencesAbilityCtx(action, subject);
  return new AbilityFactory(ctx);
}

export function competenceAbilities(ctx: CompetencesAbilityCtx, user?: SessionUser): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user?.isAdmin()) {
    can(Actions.Manage, 'all');
  }
  can(Actions.AccessCollection, Competence);
  // Create: Only admin can create
  // Update: Only admin can update
  // Access: Only admin can access Item
  // Delete: Only admin can delete Item

  return build();
}
