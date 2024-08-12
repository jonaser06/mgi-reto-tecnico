import { Book } from '../entities/book.entity';

export interface BookRepository {
  findAll(): Promise<Book[]>;
  findByIsbn(isbn: string): Promise<Book | null>;
  create(book: Book): Promise<Book>;
  update(isbn: string, book: Partial<Book>): Promise<Book>;
  delete(isbn: string): Promise<void>;
}
