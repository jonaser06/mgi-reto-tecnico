import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CollectionRepository } from '../../domain/repositories/collection.repository';
import { CreateColectionsError } from 'src/collections/domain/errors/application/create-collections.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AddBookToCollectionUseCase {
  constructor(
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(collectionId: string, bookId: string): Promise<void> {
    try {
      this.logger.log(
        `Adding book ${bookId} to collection ${collectionId}`,
        AddBookToCollectionUseCase.name
      );
      return await this.collectionRepository.addBookToCollection(collectionId, bookId);
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred adding book to collection: ${error.message}`,
        error.stack
      );
      throw new CreateColectionsError('Error adding book to collection', [{ message: error.message }]);
    }
  }
}
