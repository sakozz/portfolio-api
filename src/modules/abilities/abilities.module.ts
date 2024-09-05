import { Module } from '@nestjs/common';
import { AbilityCtx, AbilityFactory } from './ability.factory';

@Module({
  providers: [AbilityFactory, AbilityCtx],
  exports: [AbilityFactory, AbilityCtx],
})
export class AbilitiesModule {}
