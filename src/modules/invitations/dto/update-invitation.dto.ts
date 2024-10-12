import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';
import { Role } from 'src/types/roles';

export default class UpdateInvitationDto {
  @IsOptionalOrEmpty()
  expiresAt: string;

  @IsOptionalOrEmpty()
  role: Role;
}
