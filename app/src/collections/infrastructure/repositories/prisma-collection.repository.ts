import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Collection } from '../../domain/entities/collection.entity';
import { CollectionRepository } from '../../domain/repositories/collection.repository';
import { InfrastructureError } from 'src/collections/domain/errors/infrastructure/infrastructure.error';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PrismaCollectionRepository implements CollectionRepository {
  private prisma = new PrismaClient();
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  async findAll(): Promise<Collection[]> {
    try {
      this.logger.log(
        `Getting collections`,
        PrismaCollectionRepository.name
      );
      return await this.prisma.collection.findMany({
        include: { books: true },
      });
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting collections: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('Error getting collections', [{ message: error.message }]);
    }
  }

  async findById(id: string): Promise<Collection | null> {
    try {
      this.logger.log(
        `Getting collection by ID ${id}`,
        PrismaCollectionRepository.name
      );
      return await this.prisma.collection.findUnique({
        where: { id },
        include: { books: true },
      });
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred getting collection by ID: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('Error getting collection by ID', [{ message: error.message }]);
      
    }
  }

  async create(name: string): Promise<Collection> {
    try {
      this.logger.log(
        `Creating collection ${name}`,
        PrismaCollectionRepository.name
      );
      return await this.prisma.collection.create({
        data: { name },
        include: { books: true },
      });
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred creating collection: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('Error creating collection', [{ message: error.message }]);
      
    }
  }

  async addBookToCollection(collectionId: string, bookId: string): Promise<any> {

    try {
      this.logger.log(
        `Adding book ${bookId} to collection ${collectionId}`,
        PrismaCollectionRepository.name
      );
      return await this.prisma.collection.update({
        where: { id: collectionId },
        data: {
          books: {
            connect: { id: bookId },
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `An unexpected error has ocurred adding book to collection: ${error.message}`,
        error.stack
      );
      throw new InfrastructureError('Error adding book to collection', [{ message: error.message }]);
      
    }
  }
}
