import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import SessionUser from '../types/common';

export type UserRecord = keyof SessionUser;

export const CurrentUser = createParamDecorator((data: UserRecord, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  return data ? request.user?.[data] : (request.user as SessionUser);
});
