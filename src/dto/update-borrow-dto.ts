import { ApiProperty } from '@nestjs/swagger';

export class UpdateBorrowDto {
  @ApiProperty({
    example: '2024-06-07',
    description: 'date of returning borrow books',
  })
  returned_time: Date;
}
