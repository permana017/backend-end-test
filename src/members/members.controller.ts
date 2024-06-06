import { Member } from 'src/entitys/member.entity';
import { MembersService } from './members.service';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMemberDto } from 'src/dto/create-member-dto';

@Controller('members')
export class MembersController {
  constructor(private readonly memberService: MembersService) {}
  @Get()
  @ApiOperation({ summary: 'Get all members' })
  @ApiResponse({ status: 200, description: 'Return all members.' })
  findAll(): Promise<Member[]> {
    return this.memberService.findAll();
  }
  @Get('/:code')
  @ApiOperation({ summary: 'Get one members by code' })
  @ApiResponse({ status: 200, description: 'Return one by members.' })
  findOne(@Param('code') code: string): Promise<Member> {
    return this.memberService.findOne(code);
  }
  @Post()
  @ApiOperation({ summary: 'Create new member' })
  @ApiResponse({
    status: 200,
    description: 'Return message succes create member.',
  })
  create(@Body() member: CreateMemberDto): Promise<Member> {
    return this.memberService.create(member);
  }
  @Delete('/:code')
  delete(@Param('code') code: string): Promise<string> {
    return this.memberService.delete(code);
  }
}
