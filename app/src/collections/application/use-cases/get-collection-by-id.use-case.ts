import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CollectionRepository } from '../../domain/repositories/collection.repository';
import { Collection } from '../../domain/entities/collection.entity';
import { GetColectionsError } from 'src/collections/domain/errors/application/get-collections.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class GetCollectionByIdUseCase {
  constructor(
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(id: string): Promise<Collection | null> {
    try {
      this.logger.log(
        `Getting collection by ID ${id}`,
        GetCollectionByIdUseCase.name
      );
      return await this.collectionRepository.findById(id);
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting collection by ID: ${error.message}`,
        error.stack
      );
      throw new GetColectionsError('Error getting collection by ID');
    }
  }
}
