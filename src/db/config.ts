import { ConfigService } from '@nestjs/config';
// import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const postgresConfig = (config: ConfigService, entities: any[]) => {
  return {
    type: 'postgres',
    host: config.get('pg.host'),
    port: config.get('pg.port'),
    username: config.get('pg.username'),
    password: config.get('pg.password'),
    database: config.get('pg.dbName'),
    entities: entities,
    autoLoadEntities: true,
    synchronize: true,
  };
};
