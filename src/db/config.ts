import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const postgresConfig = (config: ConfigService): PostgresConnectionOptions => {
  return {
    type: 'postgres',
    host: config.get('pg.host'),
    port: config.get('pg.port'),
    username: config.get('pg.username'),
    password: config.get('pg.password'),
    database: config.get('pg.dbName'),
    entities: [join(__dirname, '../entities/', '*.entity.{ts,js}')],
    logging: true,
    synchronize: false,
  };
};
