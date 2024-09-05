import { AbilityBuilder, createMongoAbility, MongoQuery } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import SessionUser from 'src/types/common';
import { ProfileCompetenceGroup } from 'src/entities/profile-competence-group.entity';
import { Actions, Subjects } from 'src/modules/casl/casal-actions';

import { AbilityCtx, AbilityFactory, AppAbility } from 'src/modules/casl/ability.factory';

@Injectable()
export class ProfileCompetenceGroupAbilityCtx implements AbilityCtx {
  action: Actions;
  subject?: Subjects = ProfileCompetenceGroup;
  profileId?: number;
}

/** Use this function to avoid injecting Types and interfaces to constructor. Because DI will complain when used with constructor */
export const newProfileCompetenceGroupAbilityCtx = (
  action: Actions,
  subject: Subjects,
  profileId: number,
) => {
  const ctx = new ProfileCompetenceGroupAbilityCtx();
  ctx.action = action;
  ctx.subject = subject;
  ctx.profileId = profileId;
  return ctx;
};

export function profileCompetenceGroupAbilityFactory(
  action: Actions,
  subject: Subjects = ProfileCompetenceGroup,
  profileId?: number,
): AbilityFactory {
  const ctx = newProfileCompetenceGroupAbilityCtx(action, subject, profileId);
  return new AbilityFactory(ctx);
}

export function profileCompetenceGroupAbilities(
  ctx: ProfileCompetenceGroupAbilityCtx,
  user?: SessionUser,
): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user?.isAdmin()) {
    can(Actions.Manage, 'all');
  }

  can(Actions.Create, ProfileCompetenceGroup, {
    profileId: { $eq: ctx.profileId },
  } as MongoQuery<ProfileCompetenceGroup>);

  can(Actions.Access, ProfileCompetenceGroup);
  /** profileId for Subject should be the same as id of profile of current user  */
  can(Actions.Update, ProfileCompetenceGroup, {
    profileId: { $eq: ctx.profileId },
  } as MongoQuery<ProfileCompetenceGroup>);

  can(Actions.Delete, ProfileCompetenceGroup, {
    profileId: { $eq: ctx.profileId },
  } as MongoQuery<ProfileCompetenceGroup>);

  can(Actions.Access, ProfileCompetenceGroup);
  return build();
}
