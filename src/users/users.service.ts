import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(userData: { username: string; password: string }): User {
    const user = { id: this.idCounter++, ...userData };
    this.users.push(user);
    return user;
  }

  findByUsername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
}