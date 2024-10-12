import { Role } from './roles';

export default class SessionUser {
  constructor(
    public authToken: string,
    public refreshToken: string,
    public id: number,
    public role: Role,
    public email: string,
  ) {}

  isAdmin(): boolean {
    return this.role === 'admin';
  }
}
