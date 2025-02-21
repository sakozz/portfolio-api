import {} from 'class-validator';

import { Expose } from 'class-transformer';

export default class ProjectItemDto {
  @Expose()
  id: number;

  @Expose()
  profileId: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

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
