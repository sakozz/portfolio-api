import { IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';
import { consts } from 'src/config/constants';
import GroupCompetenceDto from './group-competence.dto';
import { Transform } from 'class-transformer';

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
  /*  @Transform(() => (value: GroupCompetenceDto[]) => value.filter((item) => !item.isDeleted), {
    toClassOnly: true,
  })*/
  competences: GroupCompetenceDto[];
}
