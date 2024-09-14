import { IsNotEmpty, IsInt, Max, Min, IsBoolean } from 'class-validator';
import { IsOptionalOrEmpty } from 'src/decorators/optional.decorator';

export default class SaveGroupCompetenceDto {
  @IsNotEmpty()
  competenceId: number;

  @IsNotEmpty()
  @IsInt()
  @Max(10)
  @Min(1)
  level: number;

  @IsOptionalOrEmpty()
  @IsBoolean()
  isDeleted: boolean;
}
