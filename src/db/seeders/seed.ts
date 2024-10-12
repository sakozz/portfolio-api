import { DataSourceOptions, DataSource } from 'typeorm';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import { MainSeeder } from './main.seeder';
import dbConfig from '../db.config';
// import { CompetenceFactory } from './competence.factory';

const options: DataSourceOptions & SeederOptions = {
  ...dbConfig(),
  seeds: [MainSeeder],
  factories: [],
};

const datasource = new DataSource(options);

datasource.initialize().then(async () => {
  // await datasource.synchronize(true);
  await runSeeders(datasource);
  process.exit();
});
