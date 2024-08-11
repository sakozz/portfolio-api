import { IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';
import { consts } from 'src/config/constants';

export default class SaveCompetenceDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  name: string;

  @IsOptional()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;
}
