import { Expose, Type } from 'class-transformer';
import ProjectItemDto from './project-item.dto';

export default class ProjectCollectionDto {
  @Expose()
  totalCount: number;

  @Expose()
  @Type(() => ProjectItemDto, {
    discriminator: {
      property: '__type',
      subTypes: [{ value: ProjectItemDto, name: 'items' }],
    },
  })
  items: ProjectItemDto[];
}
