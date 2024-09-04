import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ENTITY_ABILITIES, EntityAbilities } from './abilities.decorator';
import { ForbiddenError } from '@casl/ability';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const entityAbilities = this.reflector.get<EntityAbilities>(
      ENTITY_ABILITIES,
      context.getHandler(),
    );

    if (!entityAbilities) return true;

    const { user } = context.switchToHttp().getRequest();
    const ability = entityAbilities.defineAbilities(user);

    try {
      ForbiddenError.from(ability).throwUnlessCan(entityAbilities.action, entityAbilities.subject);
      return true;
    } catch (e) {
      return false;
    }
  }
}
