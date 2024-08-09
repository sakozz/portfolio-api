import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1723201677859 implements MigrationInterface {
  name = 'InitialSchema1723201677859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "basic_entity" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9d49ae5c218eb0f6b9ce01f05da" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying(100) NOT NULL,
                "password" character varying(300) NOT NULL,
                "role" character varying(50) NOT NULL,
                "isActive" boolean DEFAULT false,
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying(100) NOT NULL,
                "firstName" character varying(50) NOT NULL,
                "lastName" character varying(50) NOT NULL,
                "linkedInUrl" character varying(150),
                "githubUrl" character varying(150),
                "facebookUrl" character varying(150),
                "stackoverflowUrl" character varying(150),
                "description" character varying(3000),
                "avatarUrl" character varying(500),
                "deletedAt" TIMESTAMP,
                "userId" integer,
                CONSTRAINT "UQ_3825121222d5c17741373d8ad13" UNIQUE ("email"),
                CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"
        `);
    await queryRunner.query(`
            DROP TABLE "profile"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "basic_entity"
        `);
  }
}
