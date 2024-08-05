import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/')
  users(): Promise<any[]> {
    return Promise.resolve([]);
  }
}