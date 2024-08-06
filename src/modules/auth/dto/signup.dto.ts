import { IsEmail, MinLength, MaxLength, Matches, IsNotEmpty, IsEmpty } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';
import { Role } from 'src/common/types/roles';
import { consts } from 'src/config/constants';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmpty()
  role: Role;

  @MinLength(5)
  @MaxLength(50)
  @Matches(consts.passwordRegex, {
    message: 'password too weak',
  })
  password: string;

  @Match(SignupDto, (s) => s.password)
  confirmPassword: string;
}
