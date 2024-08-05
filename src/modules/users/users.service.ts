import { Injectable } from '@nestjs/common';
import { User } from './dtos/user';

@Injectable()
export class UsersService {
  users: User[] = [
    { email: 'firstMail.gmail.com', name: 'First' },
    { email: 'secondMail.gmail.com', name: 'Second' },
  ];

  async findOne(email: string): Promise<User> {
    return Promise.resolve(this.users.find((user) => user.email == email));
  }
}
