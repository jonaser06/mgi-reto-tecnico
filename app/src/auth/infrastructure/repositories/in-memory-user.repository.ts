import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findByUsername(username: string): Promise<User | null> {
    return this.users.find(user => user.username === username) || null;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
