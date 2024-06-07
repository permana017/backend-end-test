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
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
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
