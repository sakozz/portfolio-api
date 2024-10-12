import { AbilityBuilder, createMongoAbility, MongoQuery } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Profile } from 'src/entities/profile.entity';

import { Actions } from '../abilities/abilities.actions';
import { AbilityCtx, AbilityFactory, AppAbility } from '../abilities/ability.factory';

import SessionUser from 'src/types/common';

import { Subjects } from 'src/modules/abilities/abilities.actions';

@Injectable()
export class ProfileAbilityCtx implements AbilityCtx {
  action: Actions;
  subject?: Subjects = Profile;
  userId?: number;
}

/** Use this function to avoid injecting Types and interfaces to constructor. Because DI will complain when used with constructor */
export const newProfileAbilityCtx = (action: Actions, subject: Subjects, userId: number) => {
  const ctx = new ProfileAbilityCtx();
  ctx.action = action;
  ctx.subject = subject;
  ctx.userId = userId;
  return ctx;
};

export function profileAbilityFactory(
  action: Actions,
  subject: Subjects = Profile,
  userId?: number,
): AbilityFactory {
  const ctx = newProfileAbilityCtx(action, subject, userId);
  return new AbilityFactory(ctx);
}

export function profileAbilities(ctx: ProfileAbilityCtx, user?: SessionUser): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user?.isAdmin()) {
    can(Actions.Manage, 'all');
  }

  can(Actions.Access, Profile);
  can(Actions.Update, Profile, { userId: { $eq: ctx.userId } } as MongoQuery<Profile>);

  return build();
}
