import { Expose } from 'class-transformer';

export default class ProfileDto {
  @Expose()
  userId: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  linkedInUrl: string;

  @Expose()
  githubUrl: string;

  @Expose()
  stackoverflowUrl: string;

  @Expose()
  description: string;
}
