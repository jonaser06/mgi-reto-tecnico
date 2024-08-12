import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddBookToCollectionDto {
  @ApiProperty({
    example: 'book-id-123',
    description: 'The ID of the book to add to the collection',
  })
  @IsString()
  @IsNotEmpty()
  bookId: string;
}
