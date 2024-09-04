import { Expose, Type } from 'class-transformer';
import { CollectionDto } from 'src/types/dtos';

export default class CompetenceItemDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}

export class CompetenceCollectionDto extends CollectionDto {
  @Expose()
  @Type(() => CompetenceItemDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: CompetenceItemDto, name: 'items' }],
    },
  })
  items: CompetenceItemDto[];
}
