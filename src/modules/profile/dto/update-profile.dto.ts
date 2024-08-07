import { MinLength, MaxLength, IsUrl, IsOptional } from 'class-validator';
import { consts } from 'src/config/constants';

export default class UpdateProfileDto {
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
