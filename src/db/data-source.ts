import { join } from 'path';
import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.config();

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [join(__dirname, '../entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations/', '*.{ts,js}')],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrationsTableName: 'migrations_typeorm',
};
export const dataSource = new DataSource(dataSourceOptions);
