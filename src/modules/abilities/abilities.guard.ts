import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ENTITY_ABILITIES, EntityAbilities } from './abilities.decorator';

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

    const permitted = ability.can(entityAbilities.action, entityAbilities.subject);
    if (!permitted) {
      throw new ForbiddenException('You are not authorized to perform this action');
    }
    return true;
  }
}
