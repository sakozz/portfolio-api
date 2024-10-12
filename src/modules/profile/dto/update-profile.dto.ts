import { MinLength, MaxLength, IsUrl, IsDate } from 'class-validator';
import { consts } from 'src/config/constants';
import { Transform } from 'class-transformer';
import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';

export default class UpdateProfileDto {
  @IsOptionalOrEmpty()
  username: string;

  @IsOptionalOrEmpty()
  phone: string;

  @IsOptionalOrEmpty()
  jobTitle: string;

  @IsOptionalOrEmpty()
  address: string;

  @IsOptionalOrEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  dateOfBirth: Date;

  @IsOptionalOrEmpty()
  nationality: string;

  @IsOptionalOrEmpty()
  firstName: string;

  @IsOptionalOrEmpty()
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

  @IsOptionalOrEmpty()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;
}
