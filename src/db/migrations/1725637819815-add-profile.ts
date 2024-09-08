import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfile1725637819815 implements MigrationInterface {
  name = 'AddProfile1725637819815';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "project" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(50) NOT NULL,
                "responsibilities" character varying(3000) NOT NULL,
                "companyName" character varying(50) NOT NULL,
                "link" character varying(250),
                "startDate" date NOT NULL,
                "endDate" date,
                "isCurrent" boolean DEFAULT false,
                "profileId" integer,
                CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "project"
            ADD CONSTRAINT "FK_6814b5d57d931283b1a2a1908c9" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "project" DROP CONSTRAINT "FK_6814b5d57d931283b1a2a1908c9"
        `);
    await queryRunner.query(`
            DROP TABLE "project"
        `);
  }
}
