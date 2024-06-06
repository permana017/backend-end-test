import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './entitys/book.entity';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { Member } from './entitys/member.entity';
import { BorrowsModule } from './borrows/borrows.module';
import { Borrows } from './entitys/borrows.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-ap-southeast-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.kitboonpychptjrjbjum',
      password: 'LF(b9pRCgEGmwEw',
      database: 'postgres',
      entities: [Books, Member, Borrows],
      synchronize: true,
    }),
    BooksModule,
    MembersModule,
    BorrowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
