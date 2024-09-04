import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProfileCompetenceGroupsService } from './profile-competence-groups.service';
import SaveProfileCompetenceGroupDto from './dto/save-profile-competence-group.dto';
import ProfileCompetenceGroupItemDto, {
  ProfileCompetenceGroupCollectionDto,
} from './dto/profile-competence-group.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import SessionUser from 'src/types/common';
import { Require } from 'src/modules/casl/abilities.decorator';

import { Actions } from 'src/modules/casl/casal-actions';
import { AbilityFactory } from 'src/modules/casl/ability.factory';

@Controller('profiles/:profileId/competence-groups')
export class ProfileCompetenceGroupsController {
  constructor(private service: ProfileCompetenceGroupsService) {}

  @Post()
  @Require(new AbilityFactory({ action: Actions.Create }))
  @Serialize(ProfileCompetenceGroupItemDto)
  create(
    @Body() body: SaveProfileCompetenceGroupDto,
    @Param('profileId') profileId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.service.create(body, parseInt(profileId), parseInt(userId));
  }

  @Get()
  @Serialize(ProfileCompetenceGroupCollectionDto)
  async getByProfileId(@Param('profileId') profileId: string) {
    const result = await this.service.findAll(parseInt(profileId));
    return { items: result, totalCount: result.length };
  }

  @Get(':id')
  @Serialize(ProfileCompetenceGroupItemDto)
  getById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  @Serialize(ProfileCompetenceGroupItemDto)
  update(
    @Param('id') id: string,
    @Body() payload: SaveProfileCompetenceGroupDto,
    @CurrentUser() currentUser: SessionUser,
  ) {
    return this.service.update(parseInt(id), payload, currentUser);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
