import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { CollectionsModule } from './collections/collections.module';
import { LoggerModule } from './shared/logger/logger.module';



@Module({
  imports: [
    AuthModule,
    BooksModule,
    CollectionsModule,
    LoggerModule
  ],
})
export class AppModule {}
