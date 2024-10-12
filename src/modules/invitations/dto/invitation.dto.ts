import { Expose, Type } from 'class-transformer';
import { CollectionDto, ItemDto } from 'src/types/dtos';

export default class InvitationItemDto extends ItemDto {
  @Expose() email: string;
  @Expose() token: string;
  @Expose() role: string;
  @Expose() expiresAt: string;
}

export class InvitationCollectionDto extends CollectionDto {
  @Expose()
  @Type(() => InvitationItemDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: InvitationItemDto, name: 'items' }],
    },
  })
  items: InvitationItemDto[];
}
