import { IsNotEmpty, MinLength, MaxLength, IsUrl, IsEmail, IsDate } from 'class-validator';
import { consts } from 'src/config/constants';
import { Transform } from 'class-transformer';
import { Role } from 'src/types/roles';
import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';

export default class CreateProfileDto {
  @IsOptionalOrEmpty()
  @IsEmail()
  email: string;

  @IsOptionalOrEmpty()
  username: string;

  @IsOptionalOrEmpty()
  jobTitle: string;

  @IsNotEmpty()
  role: Role;

  @IsOptionalOrEmpty()
  phone: string;

  @IsOptionalOrEmpty()
  address: string;

  @IsOptionalOrEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  dateOfBirth: string;

  @IsOptionalOrEmpty()
  nationality: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptionalOrEmpty()
  @IsUrl()
  @MaxLength(consts.linkMaxLength)
  linkedInUrl: string;

  @IsOptionalOrEmpty()
  @IsUrl()
  @MaxLength(consts.linkMaxLength)
  githubUrl: string;

  @IsOptionalOrEmpty()
  @IsUrl()
  @MaxLength(consts.linkMaxLength)
  stackoverflowUrl: string;

  @IsNotEmpty()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;
}
