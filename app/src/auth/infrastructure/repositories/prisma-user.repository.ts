import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user.repository';
import { InfrastructureError } from 'src/auth/domain/errors/infrastructure/infrastructure.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private prisma = new PrismaClient();
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username },
      });
      if (!user) return null;
      this.logger.log(
        `User ${user.username} found`,
        PrismaUserRepository.name
      );
      return new User(user.id, user.username, user.password);
    } catch (error) {
      this.logger.error(
        `An error occurred while trying to find a user by username: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('An error occurred while trying to find a user by username', [{ message: error.message }]);
    }

  }

  async save(user: User): Promise<any> {
    try {
      const result = await this.prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          password: user.password,
        },
      });
      this.logger.log(
        `User ${user.username} saved`,
        PrismaUserRepository.name
      );
      return result;
    } catch (error) {
      this.logger.error(
        `An error occurred while trying to save a user: ${error.message}`,
        error.stack
      );
      console.log([{ message: error.message }])
      throw new InfrastructureError('An error occurred while trying to save a user', [{ message: error.message }]);
    }

  }
}
