import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { Member } from 'src/entitys/member.entity';
import { Repository } from 'typeorm';
import { CreateMemberDto } from 'src/dto/create-member-dto';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async findAll(): Promise<Member[]> {
    try {
      const result = this.memberRepository.find();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async findOne(code: string): Promise<Member> {
    try {
      const result = await this.memberRepository.findOne({
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

  async create(member: CreateMemberDto): Promise<any> {
    try {
      if (!member.code) {
        return new HttpException({ errors: 'code not null' }, 400);
      }
      member.total_borrow_books = 0;
      await this.memberRepository.save(member);
      return 'Succes Add Member';
    } catch (error) {
      throw error;
    }
  }

  async update(code: string, data: Member): Promise<string> {
    try {
      await this.memberRepository.update(code, data);
      return `success updadte data`;
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }

  async delete(code: string): Promise<string> {
    try {
      await this.memberRepository.delete(code);
      return `success delete member code ${code}`;
    } catch (error) {
      throw new HttpException({ error: error }, 500);
    }
  }
}
