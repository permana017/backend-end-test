import { BorrowsService } from './borrows.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBorrowDto } from 'src/dto/create-borrow-dto';
import { UpdateBorrowDto } from 'src/dto/update-borrow-dto';
import { Borrows } from 'src/entitys/borrows.entity';

@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}
  @Get()
  fineAll(): Promise<Borrows[]> {
    return this.borrowsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number): Promise<Borrows> {
    return this.borrowsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create Borrowed' })
  @ApiResponse({ status: 201, description: 'Return message succes borrow' })
  create(@Body() data: CreateBorrowDto): Promise<string> {
    return this.borrowsService.create(data);
  }

  @Put('/return/:id')
  @ApiOperation({ summary: 'Update Borrowed' })
  @ApiResponse({
    status: 201,
    description: 'Return message succes update borrowed',
  })
  update(
    @Param('id') id: number,
    @Body() data: UpdateBorrowDto,
  ): Promise<string> {
    return this.borrowsService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<string> {
    return this.borrowsService.delete(id);
  }
}
