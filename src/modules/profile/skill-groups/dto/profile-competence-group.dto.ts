import GroupCompetenceDto from '../../group-competences/dto/group-competence.dto';
import { Expose, Type } from 'class-transformer';

export default class ProfileCompetenceGroupDto {
  @Expose()
  id: string;

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
