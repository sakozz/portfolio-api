import { Expose } from 'class-transformer';

export default class GroupCompetenceDto {
  @Expose()
  id: number;

  @Expose()
  competenceId: number;

  @Expose()
  level: number;

  @Expose()
  isDeleted: boolean;
}
