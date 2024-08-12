import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CollectionRepository } from '../../domain/repositories/collection.repository';
import { Collection } from '../../domain/entities/collection.entity';
import { CreateColectionsError } from 'src/collections/domain/errors/application/create-collections.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CreateCollectionUseCase {
  constructor(
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(name: string): Promise<Collection> {
    try {
      this.logger.log(
        `Creating collection ${name}`,
        CreateCollectionUseCase.name
      );
      return await this.collectionRepository.create(name);
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred creating collection: ${error.message}`,
        error.stack
      );
      throw new CreateColectionsError('Error creating collection');
    }
  }
}
