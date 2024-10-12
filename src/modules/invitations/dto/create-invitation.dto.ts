import { IsNotEmpty, IsEmail, IsEmpty } from 'class-validator';

import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';
import { Role } from 'src/types/roles';

export default class CreateInvitationDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEmpty()
  token: string;

  @IsEmpty()
  expiresAt: Date;

  @IsOptionalOrEmpty()
  role: Role;
}
