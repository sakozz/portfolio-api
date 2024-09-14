import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileJobTitle1726321327930 implements MigrationInterface {
  name = 'ProfileJobTitle1726321327930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "jobTitle" character varying(100) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "jobTitle"
        `);
  }
}
