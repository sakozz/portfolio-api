import { IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';
import { consts } from 'src/config/constants';
import GroupCompetenceDto from '../../group-competences/dto/group-competence.dto';

export default class SkillGroupDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  name: string;

  @IsOptional()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;

  @IsNotEmpty()
  competences: GroupCompetenceDto[];
}
