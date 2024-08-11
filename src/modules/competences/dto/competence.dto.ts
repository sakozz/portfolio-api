import { Expose } from 'class-transformer';

export default class CompetenceDto {
  @Expose()
  name: string;

  @Expose()
  description: string;
}
