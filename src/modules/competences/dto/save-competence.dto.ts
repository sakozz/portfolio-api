import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { consts } from 'src/config/constants';
import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';

export default class SaveCompetenceDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  name: string;

  @IsOptionalOrEmpty()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;
}
