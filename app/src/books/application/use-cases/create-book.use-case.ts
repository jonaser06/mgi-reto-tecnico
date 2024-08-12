import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/book.entity';
import { CreateBookDto } from '../dtos/create-book.dto';
import { BookRepositoryError } from 'src/books/domain/errors/infrastructure/book-repository.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CreateBookUseCase {
  constructor(
    @Inject('BookRepository')
    private readonly bookRepository: BookRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const book = new Book(
        Date.now().toString(),
        createBookDto.isbn,
        createBookDto.title,
        createBookDto.author,
        createBookDto.price,
        createBookDto.category,
        createBookDto.cover || '',
        createBookDto.url || '',
        new Date(),
        new Date()
      );
      this.logger.log(
        `Book ${book.title} created`,
        CreateBookUseCase.name
      );
      return await this.bookRepository.create(book);
    } catch (error) {
      this.logger.error(
        `An error occurred while trying to create a book: ${error.message}`,
        error.stack
      );
      throw new BookRepositoryError('An error occurred while trying to create a book', [{ message: error.message }]);
    }
  }
}
