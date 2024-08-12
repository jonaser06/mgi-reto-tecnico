import { Controller, Get, Post, Body, Param, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { CreateBookUseCase } from '../../application/use-cases/create-book.use-case';
import { GetBooksUseCase } from '../../application/use-cases/get-books.use-case';
import { GetBookByIsbnUseCase } from '../../application/use-cases/get-book-by-isbn.use-case';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from 'src/books/application/dtos/create-book.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(
    private readonly createBookUseCase: CreateBookUseCase,
    private readonly getBooksUseCase: GetBooksUseCase,
    private readonly getBookByIsbnUseCase: GetBookByIsbnUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  @Get()
  async findAll(
    @Res() res: Response,
  ): Promise<any> {
    const result =  await this.getBooksUseCase.execute();
    res.status(HttpStatus.OK)
    res.send({
      status:'success',
      message: 'Books retrieved successfully',
      data: result
    })
  }

  @Get(':isbn')
  @ApiOperation({ summary: 'Get a book by ISBN' })
  @ApiResponse({ status: 200, description: 'Return a single book.' })
  async findOne(
    @Param('isbn') isbn: string,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.getBookByIsbnUseCase.execute(isbn);
    res.status(HttpStatus.OK)
    res.send({
      status:'success',
      message: 'Book retrieved successfully',
      data: result
    })
  }

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been created.' })
  async create(
    @Body() createBookDto: CreateBookDto,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.createBookUseCase.execute(createBookDto);
    res.status(HttpStatus.CREATED)
    res.send({
      status:'success',
      message: 'Book created successfully',
      data: result
    })
  }
}
