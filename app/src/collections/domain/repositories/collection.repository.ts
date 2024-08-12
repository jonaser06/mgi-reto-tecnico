import { Collection } from '../entities/collection.entity';

export interface CollectionRepository {
  findAll(): Promise<Collection[]>;
  findById(id: string): Promise<Collection | null>;
  create(name: string): Promise<Collection>;
  addBookToCollection(collectionId: string, bookId: string): Promise<any>;
}
