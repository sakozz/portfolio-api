import { AbilityBuilder, createMongoAbility, MongoQuery } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import SessionUser from 'src/types/common';
import { Actions, Subjects } from 'src/modules/abilities/abilities.actions';
import { AbilityCtx, AbilityFactory, AppAbility } from 'src/modules/abilities/ability.factory';
import { Experience } from 'src/entities/experience.entity';

@Injectable()
export class ExperiencesAbilityCtx implements AbilityCtx {
  action: Actions;
  subject?: Subjects = Experience;
  profileId?: number;
}

/** Use this function to avoid injecting Types and interfaces to constructor. Because DI will complain when used with constructor */
export const newExperiencesAbilityCtx = (action: Actions, subject: Subjects, profileId: number) => {
  const ctx = new ExperiencesAbilityCtx();
  ctx.action = action;
  ctx.subject = subject;
  ctx.profileId = profileId;
  return ctx;
};

export function experiencesAbilityFactory(
  action: Actions,
  subject: Subjects = Experience,
  profileId?: number,
): AbilityFactory {
  const ctx = newExperiencesAbilityCtx(action, subject, profileId);
  return new AbilityFactory(ctx);
}

export function experiencesAbilities(ctx: ExperiencesAbilityCtx, user?: SessionUser): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user?.isAdmin()) {
    can(Actions.Manage, 'all');
  }

  //Access:  Only Admin can access individual experiences
  can(Actions.AccessCollection, Experience);
  can(Actions.Create, Experience, { profileId: { $eq: ctx.profileId } } as MongoQuery<Experience>);
  can(Actions.Update, Experience, { profileId: { $eq: ctx.profileId } } as MongoQuery<Experience>);
  can(Actions.Delete, Experience, { profileId: { $eq: ctx.profileId } } as MongoQuery<Experience>);

  return build();
}
