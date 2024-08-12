import { Controller, Get, Post, Body, Param, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { CreateCollectionUseCase } from '../../application/use-cases/create-collection.use-case';
import { GetCollectionsUseCase } from '../../application/use-cases/get-collections.use-case';
import { GetCollectionByIdUseCase } from '../../application/use-cases/get-collection-by-id.use-case';
import { AddBookToCollectionUseCase } from '../../application/use-cases/add-book-to-collection.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCollectionDto } from 'src/collections/application/dtos/create-collection.dto';
import { AddBookToCollectionDto } from 'src/collections/application/dtos/add-book-to-collection.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Collections')
@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
    private readonly getCollectionsUseCase: GetCollectionsUseCase,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly addBookToCollectionUseCase: AddBookToCollectionUseCase,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all collections' })
  @ApiResponse({ status: 200, description: 'Return all collections.' })
  @Get()
  async findAll(
    @Res() res: Response,
  ) {
    const result = await this.getCollectionsUseCase.execute();
    res.status(HttpStatus.OK)
    res.send({
      status:'success',
      message: 'Collections retrieved successfully',
      data: result
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get a collection by ID' })
  @ApiResponse({ status: 200, description: 'Return the collection.' })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const result = await this.getCollectionByIdUseCase.execute(id);
    res.status(HttpStatus.OK)
    res.send({
      status:'success',
      message: 'Collection retrieved successfully',
      data: result
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new collection' })
  @ApiResponse({ status: 201, description: 'The collection has been created.' })
  @Post()
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
    @Res() res: Response,
  ) {
    const result = await this.createCollectionUseCase.execute(createCollectionDto.name);
    res.status(HttpStatus.CREATED)
    res.send({
      status:'success',
      message: 'Collection created successfully',
      data: result
    })
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Add books to a collection' })
  @ApiResponse({ status: 200, description: 'The book has been added to the collection.' })
  @Post(':id/add-items')
  async addBookToCollection(
    @Param('id') id: string, 
    @Body() addBookToCollectionDto: AddBookToCollectionDto,
    @Res() res: Response,
  ) {
    const result = await this.addBookToCollectionUseCase.execute(id, addBookToCollectionDto.bookId);
    res.status(HttpStatus.OK)
    res.send({
      status:'success',
      message: 'Book added to collection successfully',
      data: result
    })
  }
}
