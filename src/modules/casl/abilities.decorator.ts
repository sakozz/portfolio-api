import { Actions, Subjects } from './casal-actions';
import { SetMetadata } from '@nestjs/common';
import { AppAbility } from './ability.factory';
import SessionUser from 'src/types/common';

export interface EntityAbilities {
  defineAbilities: (user: SessionUser) => AppAbility;
  subject: Subjects;
  action: Actions;
}

export const ENTITY_ABILITIES = 'entityAbilities';
export const Require = (entityAbilities: EntityAbilities) =>
  SetMetadata(ENTITY_ABILITIES, entityAbilities);
