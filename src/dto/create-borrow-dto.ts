import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto {
  @ApiProperty({
    example: 'M001',
    description: 'the code of member',
  })
  borrowed_member_code: string;
  @ApiProperty({
    example: 'JK-48',
    description: 'the code of books',
  })
  borrowed_book_code: string;
  @ApiProperty({
    example: 'borrowed',
    description: 'the default status borrowed',
  })
  status: string;
}
