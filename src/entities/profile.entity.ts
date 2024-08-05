import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 150 })
  linkedInUrl: string;

  @Column({ length: 150 })
  githubUrl: string;

  @Column({ length: 150 })
  facebookUrl: string;

  @Column({ length: 150 })
  stackoverflowUrl: string;

  @Column({ length: 3000 })
  description: string;
}
