import { IsNotEmpty, IsInt, Max, Min, IsOptional, IsBoolean } from 'class-validator';

export default class SaveGroupCompetenceDto {
  @IsNotEmpty()
  competenceId: number;

  @IsNotEmpty()
  @IsInt()
  @Max(10)
  @Min(1)
  level: number;

  @IsOptional()
  @IsBoolean()
  isDeleted: boolean;
}
