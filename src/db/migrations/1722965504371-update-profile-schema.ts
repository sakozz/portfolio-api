import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProfileSchema1722965504371 implements MigrationInterface {
  name = 'UpdateProfileSchema1722965504371';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "profile" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "UQ_a24972ebd73b106250713dcddd9" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "profile" DROP CONSTRAINT "UQ_a24972ebd73b106250713dcddd9"`,
    );
    await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "userId"`);
  }
}
