import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CollectionRepository } from '../../domain/repositories/collection.repository';
import { Collection } from '../../domain/entities/collection.entity';
import { GetColectionsError } from 'src/collections/domain/errors/application/get-collections.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class GetCollectionsUseCase {
  constructor(
    @Inject('CollectionRepository')
    private readonly collectionRepository: CollectionRepository,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async execute(): Promise<Collection[]> {
    try {
      this.logger.log(
        `Getting collections`,
        GetCollectionsUseCase.name
      );
      return await this.collectionRepository.findAll();
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting collections: ${error.message}`,
        error.stack
      );
      throw new GetColectionsError('Error getting collections');
    }
  }
}
