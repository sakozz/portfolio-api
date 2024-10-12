import { AbilityBuilder, createMongoAbility, MongoQuery } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import SessionUser from 'src/types/common';
import { Actions, Subjects } from 'src/modules/abilities/abilities.actions';
import { AbilityCtx, AbilityFactory, AppAbility } from 'src/modules/abilities/ability.factory';
import { Project } from '../../../entities/project.entity';

@Injectable()
export class ProjectsAbilityCtx implements AbilityCtx {
  action: Actions;
  subject?: Subjects = Project;
  profileId?: number;
}

/** Use this function to avoid injecting Types and interfaces to constructor. Because DI will complain when used with constructor */
export const newProjectsAbilityCtx = (action: Actions, subject: Subjects, profileId: number) => {
  const ctx = new ProjectsAbilityCtx();
  ctx.action = action;
  ctx.subject = subject;
  ctx.profileId = profileId;
  return ctx;
};

export function projectsAbilityFactory(
  action: Actions,
  subject: Subjects = Project,
  profileId?: number,
): AbilityFactory {
  const ctx = newProjectsAbilityCtx(action, subject, profileId);
  return new AbilityFactory(ctx);
}

export function projectsAbilities(ctx: ProjectsAbilityCtx, user?: SessionUser): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user && user?.isAdmin()) {
    can(Actions.Manage, 'all');
  }

  //Access:  Only Admin can access individual experiences
  can(Actions.AccessCollection, Project);
  can(Actions.Create, Project, { profileId: { $eq: ctx.profileId } } as MongoQuery<Project>);
  can(Actions.Update, Project, { profileId: { $eq: ctx.profileId } } as MongoQuery<Project>);
  can(Actions.Delete, Project, { profileId: { $eq: ctx.profileId } } as MongoQuery<Project>);

  return build();
}
