import { Expose } from 'class-transformer';

export default class ProfileDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  role: string;

  @Expose()
  username: string;

  @Expose()
  jobTitle: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  address: string;

  @Expose()
  dateOfBirth: string;

  @Expose()
  nationality: string;

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

  @Expose()
  avatarUrl: string;

  @Expose({ groups: ['admin'] })
  deletedAt: Date;
}
