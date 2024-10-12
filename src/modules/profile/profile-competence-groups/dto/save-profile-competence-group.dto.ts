import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { consts } from 'src/config/constants';
import SaveGroupCompetenceDto from '../../group-competences/dto/save-group-competence.dto';
import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';

export default class SaveProfileCompetenceGroupDto {
  @IsNotEmpty()
  @MinLength(consts.nameMinLength)
  @MaxLength(consts.nameMaxLength)
  name: string;

  @IsOptionalOrEmpty()
  @MinLength(consts.descriptionsMinLength)
  @MaxLength(consts.descriptionMaxLength)
  description: string;

  @IsNotEmpty()
  competences: SaveGroupCompetenceDto[];
}
