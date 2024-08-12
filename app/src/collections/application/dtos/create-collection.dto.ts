import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCollectionDto {
  @ApiProperty({
    example: 'Science Fiction Favorites',
    description: 'The name of the collection',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
