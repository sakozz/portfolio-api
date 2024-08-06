import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserTables1722935488265 implements MigrationInterface {
  name = 'UpdateUserTables1722935488265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" 
      ("id" SERIAL NOT NULL,
       "email" character varying(100) NOT NULL,
       "password" character varying(100) NOT NULL,
       "role" character varying(50) NOT NULL, 
       "isActive" boolean DEFAULT false,
       "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
       "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
       "deletedAt" TIMESTAMP,
       CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), 
       CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "linkedInUrl" character varying(150) NOT NULL, "githubUrl" character varying(150) NOT NULL, "facebookUrl" character varying(150) NOT NULL, "stackoverflowUrl" character varying(150) NOT NULL, "description" character varying(3000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profile"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
