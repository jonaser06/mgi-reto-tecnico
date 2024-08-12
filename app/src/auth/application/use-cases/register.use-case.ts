import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryError } from 'src/auth/domain/errors/infrastructure/user-repository.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('UserRepository') 
    private readonly userRepository: UserRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(createUserDto: CreateUserDto): Promise<void> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = new User(
        Date.now().toString(),
        createUserDto.username,
        hashedPassword,
      );
      this.logger.log(
        `User ${user.username} registered`,
        RegisterUseCase.name
      );
      await this.userRepository.save(user);
    } catch (error) {
      this.logger.error(
        `An error occurred while trying to register a user: ${error.message}`,
        error.stack
      );
      throw new UserRepositoryError('An error occurred while trying to register a user', [{ message: error.message }]);
    }
  }
}
