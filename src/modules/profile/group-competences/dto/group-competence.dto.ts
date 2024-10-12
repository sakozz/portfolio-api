import { Expose, Type } from 'class-transformer';
import CompetenceItemDto from 'src/modules/competences/dto/competence.dto';

export default class GroupCompetenceDto {
  @Expose()
  id: number;

  @Expose()
  competenceId: number;

  @Expose()
  @Type(() => CompetenceItemDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: CompetenceItemDto, name: 'competence' }],
    },
  })
  // @Transform(({ value }) => value.name, { toClassOnly: true })
  competence: CompetenceItemDto;

  @Expose()
  level: number;

  @Expose()
  isDeleted: boolean;
}
