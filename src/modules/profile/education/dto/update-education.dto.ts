import {
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

export default class UpdateEducationDto {
  @IsOptional()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  degreeProgram: string;

  @IsOptional()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  university: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(consts.linkMaxLength)
  link: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  startDate: string;

  @IsOptional()
  @ValidateIf((other) => !other.completed)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
