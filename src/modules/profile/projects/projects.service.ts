import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';
import { Profile } from '../../../entities/profile.entity';
import { AbilityFactory } from 'src/modules/abilities/ability.factory';
import { newProjectsAbilityCtx } from './projects.abilities';
import { Actions } from 'src/modules/abilities/abilities.actions';
import { Project } from '../../../entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    private abilities: AbilityFactory,
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @InjectRepository(Project) private repo: Repository<Project>,
  ) {}

  async findOne(id: number): Promise<Project> {
    const project = await this.repo.findOneBy({ id });
    if (!project) throw new NotFoundException('Record Not found');
    return project;
  }

  async create(
    projectData: CreateProjectDto,
    profileId: number,
    currentUserId: number,
  ): Promise<Project> {
    const newRecord = this.repo.create(projectData);
    const currentUserProfile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });
    newRecord.profileId = profileId;

    this.abilities.authorize(
      newProjectsAbilityCtx(Actions.Create, newRecord, currentUserProfile.id),
    );
    const profile = new Profile();
    profile.id = profileId;
    newRecord.profile = profile;
    return this.repo.save(newRecord);
  }

  async findAll(profileId: number): Promise<Project[]> {
    return this.repo.findBy({ profile: { id: profileId } });
  }

  async remove(id: number, currentUserId: number): Promise<void> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(newProjectsAbilityCtx(Actions.Delete, record, profile.id));

    const result = await this.repo.delete({ id });
    if (result.affected === 0) throw new UnprocessableEntityException('Invalid Operation');
  }

  async update(id: number, newData: UpdateProjectDto, currentUserId: number): Promise<Project> {
    const record = await this.findOne(id);
    const profile = await this.profileRepo.findOneBy({ user: { id: currentUserId } });

    /** profileId for Subject should be the same as id of profile of current user  */
    this.abilities.authorize(newProjectsAbilityCtx(Actions.Delete, record, profile.id));

    const result = this.repo.save({ ...record, ...newData });
    if (!result) throw new UnprocessableEntityException('Invalid Operation');
    return result;
  }
}
