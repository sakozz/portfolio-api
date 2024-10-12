import { Expose } from 'class-transformer';

export interface DtoClass {
  new (...args: any[]);
}

export class ItemDto {
  @Expose()
  id: number;
}

export class CollectionDto {
  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  size: number;
}
