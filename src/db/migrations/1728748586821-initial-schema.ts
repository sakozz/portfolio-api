import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1728748586821 implements MigrationInterface {
  name = 'InitialSchema1728748586821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "basic_entity" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_9d49ae5c218eb0f6b9ce01f05da" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
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
            CREATE TABLE "experience" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "jobTitle" character varying(50) NOT NULL,
                "responsibilities" character varying(3000) NOT NULL,
                "companyName" character varying(50) NOT NULL,
                "link" character varying(250),
                "startDate" date NOT NULL,
                "endDate" date,
                "isCurrent" boolean DEFAULT false,
                "profileId" integer,
                CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "education" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "degreeProgram" character varying(50) NOT NULL,
                "university" character varying(50) NOT NULL,
                "link" character varying(250),
                "startDate" date NOT NULL,
                "endDate" date,
                "completed" boolean DEFAULT false,
                "profileId" integer,
                CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "competence" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(50) NOT NULL,
                "description" character varying(3000),
                CONSTRAINT "UQ_40bfe61b41ddef6848eaf132435" UNIQUE ("name"),
                CONSTRAINT "PK_994109fe84a82508e174282df03" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "group_competence" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "level" integer NOT NULL,
                "groupId" integer,
                "competenceId" integer,
                CONSTRAINT "PK_67a79d045c78d62c3f31fcc5d4d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "profile_competence_group" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying(50) NOT NULL,
                "description" character varying(3000),
                "profileId" integer,
                CONSTRAINT "PK_6229338709d2e50ed64c1c42b12" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "role" character varying(50) NOT NULL,
                "jobTitle" character varying(100) NOT NULL,
                "email" character varying(100) NOT NULL,
                "username" character varying(100) NOT NULL,
                "phone" character varying(16),
                "address" character varying(1000),
                "dateOfBirth" date,
                "nationality" character varying,
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
                CONSTRAINT "UQ_d80b94dc62f7467403009d88062" UNIQUE ("username"),
                CONSTRAINT "REL_a24972ebd73b106250713dcddd" UNIQUE ("userId"),
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `);
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
            CREATE TABLE "invitation" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "email" character varying NOT NULL,
                "token" character varying NOT NULL,
                "role" character varying NOT NULL DEFAULT 'manager',
                "expiresAt" date NOT NULL,
                "deletedAt" TIMESTAMP,
                CONSTRAINT "UQ_bcb0a0d2333443083582a05cdd8" UNIQUE ("email"),
                CONSTRAINT "UQ_e061236e6abd8503aa3890af94c" UNIQUE ("token"),
                CONSTRAINT "PK_beb994737756c0f18a1c1f8669c" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "experience"
            ADD CONSTRAINT "FK_1ecc32c7c8e5618730f2730613c" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "education"
            ADD CONSTRAINT "FK_d6ebf3bb8e04d86d532f4fb11c3" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "group_competence"
            ADD CONSTRAINT "FK_93e1f502d3e8c55b33471aca9d5" FOREIGN KEY ("groupId") REFERENCES "profile_competence_group"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "group_competence"
            ADD CONSTRAINT "FK_4d2cc3574a724bc1f2e3d9c384c" FOREIGN KEY ("competenceId") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "profile_competence_group"
            ADD CONSTRAINT "FK_c4fc3cf105e5509c319c942c002" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"
        `);
    await queryRunner.query(`
            ALTER TABLE "profile_competence_group" DROP CONSTRAINT "FK_c4fc3cf105e5509c319c942c002"
        `);
    await queryRunner.query(`
            ALTER TABLE "group_competence" DROP CONSTRAINT "FK_4d2cc3574a724bc1f2e3d9c384c"
        `);
    await queryRunner.query(`
            ALTER TABLE "group_competence" DROP CONSTRAINT "FK_93e1f502d3e8c55b33471aca9d5"
        `);
    await queryRunner.query(`
            ALTER TABLE "education" DROP CONSTRAINT "FK_d6ebf3bb8e04d86d532f4fb11c3"
        `);
    await queryRunner.query(`
            ALTER TABLE "experience" DROP CONSTRAINT "FK_1ecc32c7c8e5618730f2730613c"
        `);
    await queryRunner.query(`
            DROP TABLE "invitation"
        `);
    await queryRunner.query(`
            DROP TABLE "project"
        `);
    await queryRunner.query(`
            DROP TABLE "profile"
        `);
    await queryRunner.query(`
            DROP TABLE "profile_competence_group"
        `);
    await queryRunner.query(`
            DROP TABLE "group_competence"
        `);
    await queryRunner.query(`
            DROP TABLE "competence"
        `);
    await queryRunner.query(`
            DROP TABLE "education"
        `);
    await queryRunner.query(`
            DROP TABLE "experience"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "basic_entity"
        `);
  }
}
