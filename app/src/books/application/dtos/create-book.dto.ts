import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: '978-3-16-148410-0', description: 'The ISBN of the book' })
  @IsString()
  @IsNotEmpty()
  isbn: string;

  @ApiProperty({ example: 'The Pragmatic Programmer', description: 'The title of the book' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Andrew Hunt', description: 'The author of the book' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: 29.99, description: 'The price of the book' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ example: 'Software Development', description: 'The category of the book' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 'https://example.com/covers/pragmatic-programmer.jpg', description: 'The URL of the book cover', required: false })
  cover?: string;

  @ApiProperty({ example: 'https://example.com/books/pragmatic-programmer', description: 'The URL of the book', required: false })
  url?: string;
}
