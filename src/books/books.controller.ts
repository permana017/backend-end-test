import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Books } from 'src/entitys/book.entity';
import { BooksService } from './books.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBookDto } from 'src/dto/create-book-dto';
import { UpdateBookDto } from 'src/dto/update-book-dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  findAll(): Promise<Books[]> {
    return this.booksService.findAll();
  }
  @Get('/:code')
  @ApiOperation({ summary: 'Get one book by code' })
  @ApiResponse({ status: 200, description: 'Return one book by code.' })
  findOne(@Param('code') code: string): Promise<Books> {
    return this.booksService.findOne(code);
  }

  @Post()
  @ApiOperation({ summary: 'Create one book by code' })
  @ApiResponse({ status: 201, description: 'Return message succes add book' })
  create(@Body() book: CreateBookDto): Promise<Books> {
    return this.booksService.create(book);
  }

  @Put('/:code')
  @ApiOperation({ summary: 'Update one book by code' })
  @ApiResponse({
    status: 201,
    description: 'Return message success update book',
  })
  update(
    @Body() book: UpdateBookDto,
    @Param('code') code: string,
  ): Promise<string> {
    return this.booksService.update(code, book);
  }

  @Delete('/:code')
  @ApiOperation({ summary: 'delete one book by code' })
  @ApiResponse({
    status: 200,
    description: 'Return message success delete book',
  })
  delete(@Param('code') code: string): Promise<string> {
    return this.booksService.delete(code);
  }
}
