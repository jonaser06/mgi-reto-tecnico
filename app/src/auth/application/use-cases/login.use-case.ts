import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginError } from 'src/auth/domain/errors/application/login.error';
import { UserRepositoryError } from 'src/auth/domain/errors/infrastructure/user-repository.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(username: string, password: string): Promise<{ accessToken: string }> {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new LoginError('Invalid credential, please try again');
      }
      const payload = { username: user.username, sub: user.id };
      this.logger.log(
        `User ${user.username} logged in`,
        LoginUseCase.name
      );
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } catch (error) {
      this.logger.error(
        `An error occurred while trying to login: ${error.message}`,
        error.stack
      );
      throw new UserRepositoryError('An error occurred while trying to login', [{ message: error.message }]);
    }

  }
}
