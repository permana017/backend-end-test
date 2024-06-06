import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({ example: 'M002', description: 'The code of the member' })
  code: string;

  @ApiProperty({ example: 'Jhon doe', description: 'The name of the member' })
  name: string;

  @ApiProperty({
    example: '0',
    description: 'The default total borrowed the member',
  })
  total_borrow_books: number;
}
