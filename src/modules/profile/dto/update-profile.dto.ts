import { MinLength, MaxLength, IsUrl, IsOptional, IsDate } from 'class-validator';
import { consts } from 'src/config/constants';
import { Transform } from 'class-transformer';

export default class UpdateProfileDto {
  @IsOptional()
  username: string;

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

  @IsOptional()
  firstName: string;

  @IsOptional()
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

  @IsOptional()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;
}
