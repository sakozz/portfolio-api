import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { consts } from 'src/config/constants';

export default class SkillGroupDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  name: string;

  @IsNotEmpty()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;
}
