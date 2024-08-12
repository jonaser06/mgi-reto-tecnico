import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';
import { BookRepositoryError } from 'src/books/domain/errors/infrastructure/book-repository.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class GetBooksUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(): Promise<Book[]> {
    try {
      this.logger.log(
        `Getting books`,
        GetBooksUseCase.name
      );
      return await this.bookRepository.findAll();
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting books: ${error.message}`,
        error.stack
      );
      throw new BookRepositoryError('An unexpected error has ocurred getting books', [{ message: error.message }]);
    }
  }
}
