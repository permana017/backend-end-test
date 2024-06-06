import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/entitys/member.entity';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { Borrows } from 'src/entitys/borrows.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Member, Borrows])],
  providers: [MembersService],
  controllers: [MembersController],
  exports: [MembersService],
})
export class MembersModule {}
