import { Module } from '@nestjs/common';
import { BooksController } from './infrastructure/controllers/books.controller';
import { PrismaBookRepository } from './infrastructure/repositories/prisma-book.repository';
import { CreateBookUseCase } from './application/use-cases/create-book.use-case';
import { GetBooksUseCase } from './application/use-cases/get-books.use-case';
import { GetBookByIsbnUseCase } from './application/use-cases/get-book-by-isbn.use-case';
import { JwtStrategy } from 'src/auth/infrastructure/strategies/jwt.strategy';

@Module({
  controllers: [BooksController],
  providers: [
    CreateBookUseCase,
    GetBooksUseCase,
    GetBookByIsbnUseCase,
    {
      provide: 'BookRepository',
      useClass: PrismaBookRepository,
    },
    JwtStrategy
  ],
})
export class BooksModule {}
