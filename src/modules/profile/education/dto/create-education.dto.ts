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

export default class CreateEducationDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  degreeProgram: string;

  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  university: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(consts.linkMaxLength)
  link: string;

  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  startDate: string;

  @ValidateIf((other) => !other.completed)
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  endDate: string;

  @IsOptional()
  @IsBoolean()
  completed: boolean;
}
