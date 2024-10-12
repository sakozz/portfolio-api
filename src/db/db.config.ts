import { registerAs } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
dotenv.config();

const postgresConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '../entities/', '*.entity.{ts,js}')],
  logging: true,
  synchronize: false,
};

export default registerAs('dbConfig.dev', () => postgresConfig);
