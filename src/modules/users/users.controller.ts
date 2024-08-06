import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

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
