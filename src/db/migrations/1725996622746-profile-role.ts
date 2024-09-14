import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProfileRole1725996622746 implements MigrationInterface {
  name = 'ProfileRole1725996622746';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "profile"
            ADD "role" character varying(50) NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "profile" DROP COLUMN "role"
        `);
  }
}
