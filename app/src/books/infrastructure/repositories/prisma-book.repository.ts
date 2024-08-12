import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Book } from '../../domain/entities/book.entity';
import { BookRepository } from '../../domain/repositories/book.repository';
import { InfrastructureError } from 'src/books/domain/errors/infrastructure/infrastructure.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  private prisma = new PrismaClient();
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async findAll(): Promise<Book[]> {
    try {
      this.logger.log(
        `Getting books`,
        PrismaBookRepository.name
      );
      return await this.prisma.book.findMany();
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting books: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('An unexpected error has ocurred getting books', [{ message: error.message }]);
    }
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    try {
      this.logger.log(
        `Getting book by isbn ${isbn}`,
        PrismaBookRepository.name
      );
      return await this.prisma.book.findUnique({ where: { isbn } }) ;
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting book by isbn: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('An unexpected error has ocurred getting book by isbn', [{ message: error.message }]);
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      this.logger.log(
        `Book ${book.title} created`,
        PrismaBookRepository.name
      );
      return await this.prisma.book.create({
        data: {
          isbn: book.isbn,
          title: book.title,
          author: book.author,
          price: book.price,
          category: book.category,
          cover: book.cover,
          url: book.url,
        },
      });
    } catch (error) {
      this.logger.error(
        `An error occurred while trying to create a book: ${error.message}`,
        error.stack
      );
      console.log("aaaa");
      throw new InfrastructureError('An unexpected error has ocurred creating book', [{ message: error.message }]);
    }
  }

  async update(isbn: string, book: Partial<Book>): Promise<Book> {
    try {
      this.logger.log(
        `Book ${book.title} updated`,
        PrismaBookRepository.name
      );
      return await this.prisma.book.update({
        where: { isbn },
        data: book,
      }); 
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred updating book: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('An unexpected error has ocurred updating book', [{ message: error.message }]);
    }
  }

  async delete(isbn: string): Promise<void> {
    try {
      this.logger.log(
        `Book with isbn ${isbn} deleted`,
        PrismaBookRepository.name
      );
      await await this.prisma.book.delete({ where: { isbn } });
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred deleting book: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('An unexpected error has ocurred deleting book', [{ message: error.message }]);
    }
  }
}
