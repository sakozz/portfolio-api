import { MinLength, MaxLength, IsUrl, IsDate, IsBoolean, ValidateIf } from 'class-validator';
import { consts } from 'src/config/constants';
import { Transform } from 'class-transformer';
import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';

export default class UpdateEducationDto {
  @IsOptionalOrEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  degreeProgram: string;

  @IsOptionalOrEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  university: string;

  @IsOptionalOrEmpty()
  @IsUrl()
  @MaxLength(consts.linkMaxLength)
  link: string;

  @IsOptionalOrEmpty()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  startDate: string;

  @IsOptionalOrEmpty()
  @ValidateIf((other) => !other.completed)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @IsDate()
  endDate: string;

  @IsOptionalOrEmpty()
  @IsBoolean()
  completed: boolean;
}