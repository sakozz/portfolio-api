import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';
import ProjectCollectionDto from './dto/project-collection.dto';
import ProjectItemDto from './dto/project-item.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { Require } from 'src/modules/abilities/abilities.decorator';
import { Actions } from 'src/modules/abilities/abilities.actions';
import { SkipJwtAuth } from 'src/decorators/skip-jwt-auth.decorator';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { projectsAbilityFactory } from './projects.abilities';

@Controller('profiles/:profileId/projects')
export class ProjectsController {
  constructor(private service: ProjectsService) {}

  @Post()
  // Authorize implemented in service level
  create(
    @Body() body: CreateProjectDto,
    @Param('profileId') profileId: string,
    @CurrentUser('id') currentUserId: number,
  ) {
    return this.service.create(body, parseInt(profileId), currentUserId);
  }

  @Get()
  @SkipJwtAuth()
  @Require(projectsAbilityFactory(Actions.AccessCollection))
  @Serialize(ProjectCollectionDto)
  async getAllProjects(@Param('profileId') profileId: string) {
    const result = await this.service.findAll(parseInt(profileId));
    return { items: result, totalCount: result.length };
  }

  @Get(':id')
  @Require(projectsAbilityFactory(Actions.Access))
  @Serialize(ProjectItemDto)
  getProjectById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  // Authorize implemented in service level
  updateProject(
    @Param('id') id: string,
    @Body() payload: UpdateProjectDto,
    @CurrentUser('id') currentUserId: number,
  ) {
    return this.service.update(parseInt(id), payload, currentUserId);
  }

  @Delete('/:id')
  // Authorize implemented in service level
  delete(@Param('id') id: string, @CurrentUser('id') currentUserId: number) {
    return this.service.remove(parseInt(id), currentUserId);
  }
}
