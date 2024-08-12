import { Book } from '../../../books/domain/entities/book.entity';

export class Collection {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly books: Book[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
