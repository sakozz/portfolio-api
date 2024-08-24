import {} from 'class-validator';

import { Expose } from 'class-transformer';

export default class ExperienceItemDto {
  @Expose()
  id: number;

  @Expose()
  jobTitle: string;

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
