import { Module } from '@nestjs/common';
import { CollectionsController } from './infrastructure/controllers/collections.controller';
import { PrismaCollectionRepository } from './infrastructure/repositories/prisma-collection.repository';
import { CreateCollectionUseCase } from './application/use-cases/create-collection.use-case';
import { GetCollectionsUseCase } from './application/use-cases/get-collections.use-case';
import { GetCollectionByIdUseCase } from './application/use-cases/get-collection-by-id.use-case';
import { AddBookToCollectionUseCase } from './application/use-cases/add-book-to-collection.use-case';

@Module({
  controllers: [CollectionsController],
  providers: [
    CreateCollectionUseCase,
    GetCollectionsUseCase,
    GetCollectionByIdUseCase,
    AddBookToCollectionUseCase,
    {
      provide: 'CollectionRepository',
      useClass: PrismaCollectionRepository,
    },
  ],
})
export class CollectionsModule {}
