import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  role: string;

  @Expose({ groups: ['admin'] })
  isActive: boolean;

  @Expose()
  email: string;
}
