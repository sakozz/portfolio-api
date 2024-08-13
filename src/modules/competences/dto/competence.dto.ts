import { Expose } from 'class-transformer';

export default class CompetenceDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
