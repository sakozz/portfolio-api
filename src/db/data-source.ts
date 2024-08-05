import { join } from 'path';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pgUser',
  password: 'pgPassword',
  database: 'portfolio_db',
  entities: [join(__dirname, '../entities/', '*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations/', '*.{ts,js}')],
  synchronize: true,
  logging: false,
  subscribers: [],
  migrationsTableName: 'migrations_typeorm',
};
console.log('dataSourceOptions', dataSourceOptions);
export const dataSource = new DataSource(dataSourceOptions);
