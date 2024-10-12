import {} from 'class-validator';

import { Expose, Type } from 'class-transformer';
import ExperienceItemDto from './experience-item.dto';

export default class ExperienceCollectionDto {
  @Expose()
  totalCount: number;

  @Expose()
  @Type(() => ExperienceItemDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: ExperienceItemDto, name: 'items' }],
    },
  })
  items: ExperienceItemDto[];
}
