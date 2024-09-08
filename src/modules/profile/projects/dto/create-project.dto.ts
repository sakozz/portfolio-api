import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUrl,
  IsOptional,
  IsDate,
  IsBoolean,
  ValidateIf,
} from 'class-validator';
import { consts } from 'src/config/constants';
import { Transform } from 'class-transformer';

export default class CreateProjectDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  name: string;

  @IsNotEmpty()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  responsibilities: string;

  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  companyName: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  startDate: string;

  @ValidateIf((other) => !other.isCurrent)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  isCurrent: boolean;

  @IsOptional()
  @IsUrl()
  @MaxLength(consts.linkMaxLength)
  link: string;
}
