import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProfileTable1722868201939 implements MigrationInterface {
    name = 'AddProfileTable1722868201939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "linkedInUrl" character varying(150) NOT NULL, "githubUrl" character varying(150) NOT NULL, "facebookUrl" character varying(150) NOT NULL, "stackoverflowUrl" character varying(150) NOT NULL, "description" character varying(3000) NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
