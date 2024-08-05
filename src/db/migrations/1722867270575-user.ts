import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1722867270575 implements MigrationInterface {
  name = 'User1722867270575';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" (
      "id" SERIAL NOT NULL,
      "email" character varying(100) NOT NULL,
      "firstName" character varying(50) NOT NULL,
      "lastName" character varying(50) NOT NULL,
      "description" character varying(3000) NOT NULL,
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
