import { MembersService } from './../members/members.service';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Borrows } from 'src/entitys/borrows.entity';
import { BooksService } from 'src/books/books.service';
import day from 'src/plugin/day';
import { CreateBorrowDto } from 'src/dto/create-borrow-dto';

@Injectable()
export class BorrowsService {
  constructor(
    @InjectRepository(Borrows)
    private readonly borrowsRepository: Repository<Borrows>,
    private readonly booksService: BooksService,
    private readonly membersService: MembersService,
  ) {}

  async findAll(): Promise<any> {
    try {
      const result = await this.borrowsRepository.find();
      return result;
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }
  async findOne(id: number): Promise<any> {
    try {
      const result = await this.borrowsRepository.findOneBy({ id });
      return result;
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }

  async create(borrow: CreateBorrowDto): Promise<string> {
    const books = await this.booksService.findOne(borrow.borrowed_book_code);
    if (!books || books.stock < 1)
      throw new HttpException({ error: 'the books is not avalible' }, 400);

    const member = await this.membersService.findOne(
      borrow.borrowed_member_code,
    );
    if (!member) throw new HttpException({ error: 'Member is not found' }, 400);
    if (member.total_borrow_books >= 2) {
      throw new HttpException(
        { error: 'Member has over the borrow limit' },
        400,
      );
    }
    if (member.total_borrow_books >= 2) {
      throw new HttpException(
        { error: 'Member has over the borrow limit' },
        400,
      );
    }

    if (member.pinalty_date) {
      const diffReturnDate = day(member.pinalty_date).diff(new Date(), 'day');
      if (diffReturnDate > -1) {
        throw new HttpException(
          {
            error: `Member has pinalty, try again after date ${day(member.pinalty_date).format('DD-MM-YYYY')}`,
          },
          400,
        );
      }
    }

    borrow.status = 'borrowed';
    const create = await this.borrowsRepository.save(borrow);

    if (books.stock >= 1) {
      books.stock -= 1;
    }
    await this.booksService.update(books.code, books);

    member.total_borrow_books += 1;
    await this.membersService.update(member.code, member);

    return `Succes borrowed book id = ${create.id}`;
  }

  async update(id: number, data: { returned_time: Date }): Promise<string> {
    const borrow = await this.borrowsRepository.findOneBy({ id });
    if (!borrow) {
      throw new HttpException(
        { error: `the borrow is not found id = ${id}` },
        400,
      );
    }
    const books = await this.booksService.findOne(borrow.borrowed_book_code);
    if (!books) {
      throw new HttpException({ error: 'the books is not avalible' }, 400);
    }

    const member = await this.membersService.findOne(
      borrow.borrowed_member_code,
    );
    if (!member) throw new HttpException({ error: 'member is not found' }, 400);

    if (books.stock < 1) books.stock += 1;
    await this.booksService.update(books.code, books);

    const diffReturnDate = day(data.returned_time).diff(
      borrow.borrowed_time,
      'day',
    );

    if (diffReturnDate > 7) {
      member.pinalty_date = day(new Date()).add(3, 'day').toDate();
    }

    if (member.total_borrow_books > 0) member.total_borrow_books -= 1;
    await this.membersService.update(member.code, member);

    borrow.status = 'returned';
    borrow.returned_time = data.returned_time;
    const res = await this.borrowsRepository.update(id, borrow);
    if (res.affected === 0) {
      throw new HttpException({ error: 'update not succes' }, 400);
    }

    if (diffReturnDate > 7) {
      return `success returned book, You are late in returning the book so you cannot borrow another book for the next 3 days`;
    }

    return `success returned book`;
  }

  async delete(id: number): Promise<string> {
    try {
      await this.borrowsRepository.delete(id);
      return `success delete Borrow code ${id}`;
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }
}
