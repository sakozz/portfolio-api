import { AbilityBuilder, createMongoAbility, MongoQuery } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import SessionUser from 'src/types/common';
import { ProfileCompetenceGroup } from 'src/entities/profile-competence-group.entity';
import { Actions, Subjects } from 'src/modules/casl/casal-actions';

import { AbilityCtx, AppAbility } from 'src/modules/casl/ability.factory';

@Injectable()
export class ProfileCompetenceGroupAbilityCtx implements AbilityCtx {
  action: Actions;
  subject?: Subjects;
  profileId?: number;
}

export function profileCompetenceGroupAbilityFactory(
  ctx: ProfileCompetenceGroupAbilityCtx,
  user?: SessionUser,
): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user?.isAdmin()) {
    can(Actions.Manage, 'all');
  }

  /** profileId for Subject should be the same as id of profile of current user  */
  can(Actions.Create, ProfileCompetenceGroup, {
    profileId: { $eq: ctx.profileId },
  } as MongoQuery<ProfileCompetenceGroup>);

  can(Actions.Access, ProfileCompetenceGroup);

  /** profileId for Subject should be the same as id of profile of current user  */
  can(Actions.Update, ProfileCompetenceGroup, {
    profileId: { $eq: ctx.profileId },
  } as MongoQuery<ProfileCompetenceGroup>);

  return build();
}
