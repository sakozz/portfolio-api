import {} from 'class-validator';

import { Expose } from 'class-transformer';

export default class ProjectItemDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  responsibilities: string;

  @Expose()
  companyName: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Expose()
  isCurrent: boolean;

  @Expose()
  link: string;
}
