import { AbilityBuilder, createMongoAbility, MongoQuery } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import SessionUser from 'src/types/common';
import { Actions, Subjects } from 'src/modules/abilities/abilities.actions';
import { AbilityCtx, AbilityFactory, AppAbility } from 'src/modules/abilities/ability.factory';
import { Education } from '../../../entities/education.entity';

@Injectable()
export class EducationAbilityCtx implements AbilityCtx {
  action: Actions;
  subject?: Subjects = Education;
  profileId?: number;
}

/** Use this function to avoid injecting Types and interfaces to constructor. Because DI will complain when used with constructor */
export const newEducationAbilityCtx = (action: Actions, subject: Subjects, profileId: number) => {
  const ctx = new EducationAbilityCtx();
  ctx.action = action;
  ctx.subject = subject;
  ctx.profileId = profileId;
  return ctx;
};

export function educationAbilityFactory(
  action: Actions,
  subject: Subjects = Education,
  profileId?: number,
): AbilityFactory {
  const ctx = newEducationAbilityCtx(action, subject, profileId);
  return new AbilityFactory(ctx);
}

export function educationAbilities(ctx: EducationAbilityCtx, user?: SessionUser): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user?.isAdmin()) {
    can(Actions.Manage, 'all');
  }

  //Access:  Only Admin can access individual education
  can(Actions.AccessCollection, Education);
  can(Actions.Create, Education, { profileId: { $eq: ctx.profileId } } as MongoQuery<Education>);
  can(Actions.Update, Education, { profileId: { $eq: ctx.profileId } } as MongoQuery<Education>);
  can(Actions.Delete, Education, { profileId: { $eq: ctx.profileId } } as MongoQuery<Education>);

  return build();
}
