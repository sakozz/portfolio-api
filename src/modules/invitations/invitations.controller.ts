import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationCollectionDto } from './dto/invitation.dto';
import { Request } from 'express';
import { Require } from '../abilities/abilities.decorator';
import { Actions } from '../abilities/abilities.actions';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { invitationsAbilityFactory } from './invitations.abilities';
import CreateInvitationDto from './dto/create-invitation.dto';
import InvitationItemDto from './dto/invitation.dto';
import UpdateInvitationDto from './dto/update-invitation.dto';

@Controller('invitations')
export class InvitationsController {
  constructor(private service: InvitationsService) {}

  @Post()
  @Require(invitationsAbilityFactory(Actions.Create))
  create(@Body() body: CreateInvitationDto) {
    return this.service.create(body);
  }

  @Get()
  @Require(invitationsAbilityFactory(Actions.AccessCollection))
  @Serialize(InvitationCollectionDto)
  getList(@Req() req: Request) {
    return this.service.findAll(req.query);
  }

  @Get(':id')
  @Require(invitationsAbilityFactory(Actions.Access))
  @Serialize(InvitationItemDto)
  getById(@Param('id') id: string) {
    return this.service.findOne(parseInt(id));
  }

  @Put('/:id')
  @Require(invitationsAbilityFactory(Actions.Update))
  update(@Param('id') id: string, @Body() payload: UpdateInvitationDto) {
    return this.service.update(parseInt(id), payload);
  }

  @Delete('/:id')
  @Require(invitationsAbilityFactory(Actions.Delete))
  delete(@Param('id') id: string) {
    return this.service.remove(parseInt(id));
  }
}
