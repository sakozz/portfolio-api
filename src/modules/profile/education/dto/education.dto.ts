import { Expose, Type } from 'class-transformer';
import { CollectionDto, ItemDto } from '../../../../types/dtos';

export default class EducationItemDto extends ItemDto {
  @Expose()
  profileId: number;

  @Expose()
  degreeProgram: string;

  @Expose()
  university: string;

  @Expose()
  startDate: string;

  @Expose()
  endDate: string;

  @Expose()
  completed: boolean;

  @Expose()
  link: string;
}

export class EducationCollectionDto extends CollectionDto {
  @Expose()
  @Type(() => EducationItemDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: EducationItemDto, name: 'items' }],
    },
  })
  items: EducationItemDto[];
}
