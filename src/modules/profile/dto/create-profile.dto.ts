import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUrl,
  IsOptional,
  IsEmail,
  IsDate,
} from 'class-validator';
import { consts } from 'src/config/constants';
import { Transform } from 'class-transformer';

export default class CreateProfileDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  address: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  dateOfBirth: string;

  @IsOptional()
  nationality: string;

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
