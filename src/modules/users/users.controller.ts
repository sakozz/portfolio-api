import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('users')
@Serialize(UserDto)
export class UsersController {
  constructor(private service: UsersService) {}

  @Get('/')
  users(): Promise<any[]> {
    return Promise.resolve([]);
  }

  @Get('/:id')
  userById(@Param('id') id: string): Promise<any> {
    return this.service.findOne(parseInt(id));
  }
}
