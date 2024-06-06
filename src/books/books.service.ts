import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Books } from 'src/entitys/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<Books[]> {
    try {
      const result = await this.booksRepository.find();
      return result;
    } catch (error) {
      throw new HttpException(
        {
          code: 500,
          error: error,
        },
        500,
      );
    }
  }

  async findOne(code: string): Promise<Books> {
    try {
      const result = await this.booksRepository.findOne({
        where: { code },
      });
      return result;
    } catch (error) {
      throw new HttpException(
        {
          code: 500,
          error: error,
        },
        500,
      );
    }
  }

  async create(book: Books): Promise<any> {
    try {
      if (!book.code) {
        return new HttpException({ errors: 'code not null' }, 400);
      }
      const res = await this.booksRepository.save(book);
      return res;
    } catch (error) {}
  }

  async update(code: string, data: Books): Promise<string> {
    try {
      const res = await this.booksRepository.update(code, data);
      if (res.affected === 0) {
        throw new HttpException({ error: 'update not succes' }, 400);
      }
      return `success updadte book ${data.code}`;
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }

  async delete(code: string): Promise<string> {
    try {
      await this.booksRepository.delete(code);
      return `success delete Book code ${code}`;
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }
}
