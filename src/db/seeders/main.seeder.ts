import { Seeder, SeederFactoryManager } from 'typeorm-extension';

import { DataSource } from 'typeorm';

import { competenceList } from './competence.factory';
import { Competence } from '../../entities/competence.entity';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const competenceRepo = dataSource.getRepository(Competence);
    console.log('Start Seeding Competences');
    const saveCompetencePromises = competenceList.map((competence) => {
      return competenceRepo.save(competence);
    });
    await Promise.all(saveCompetencePromises);
    console.log('Completed Seeding Competences');
  }
}
