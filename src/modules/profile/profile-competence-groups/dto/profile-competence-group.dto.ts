import { Expose, Type } from 'class-transformer';
import GroupCompetenceDto from '../../group-competences/dto/group-competence.dto';
import { CollectionDto } from 'src/types/dtos';

export default class ProfileCompetenceGroupItemDto {
  @Expose()
  id: string;

  @Expose()
  profileId: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => GroupCompetenceDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: GroupCompetenceDto, name: 'competences' }],
    },
  })
  competences: GroupCompetenceDto[];
}

export class ProfileCompetenceGroupCollectionDto extends CollectionDto {
  @Expose()
  @Type(() => ProfileCompetenceGroupItemDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: ProfileCompetenceGroupItemDto, name: 'items' }],
    },
  })
  items: ProfileCompetenceGroupItemDto[];
}
