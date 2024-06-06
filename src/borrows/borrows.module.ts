import { Module } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { BorrowsController } from './borrows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrows } from 'src/entitys/borrows.entity';
import { BooksModule } from 'src/books/books.module';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [TypeOrmModule.forFeature([Borrows]), BooksModule, MembersModule],
  controllers: [BorrowsController],
  providers: [BorrowsService, BorrowsService],
})
export class BorrowsModule {}
