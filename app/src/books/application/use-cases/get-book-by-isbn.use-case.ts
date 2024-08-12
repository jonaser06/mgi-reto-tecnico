import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';
import { BookRepositoryError } from 'src/books/domain/errors/infrastructure/book-repository.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class GetBookByIsbnUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(isbn: string): Promise<Book | null> {
    try {
      this.logger.log(
        `Getting book by isbn ${isbn}`,
        GetBookByIsbnUseCase.name
      );
      const result = await this.bookRepository.findByIsbn(isbn);
      if (!result) {
        throw new BookRepositoryError('Book not found');
      }
      return result;
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting book by isbn: ${error.message}`,
        error.stack
      );
      throw new BookRepositoryError('An unexpected error has ocurred getting book by isbn', [{ message: error.message }]);
    }
  }
}
