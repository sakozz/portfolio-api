import { IsNotEmpty, MinLength, MaxLength, IsOptional } from 'class-validator';
import { consts } from 'src/config/constants';
import SaveGroupCompetenceDto from '../../group-competences/dto/save-group-competence.dto';

export default class SaveProfileCompetenceGroupDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  name: string;

  @IsOptional()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;

  @IsNotEmpty()
  competences: SaveGroupCompetenceDto[];
}
