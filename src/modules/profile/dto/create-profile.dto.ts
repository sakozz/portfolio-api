import { IsNotEmpty, MinLength, MaxLength, IsUrl, IsOptional, IsEmail } from 'class-validator';
import { consts } from 'src/config/constants';

export default class CreateProfileDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsUrl()
  linkedInUrl: string;

  @IsOptional()
  @IsUrl()
  githubUrl: string;

  @IsOptional()
  @IsUrl()
  stackoverflowUrl: string;

  @IsNotEmpty()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;
}
