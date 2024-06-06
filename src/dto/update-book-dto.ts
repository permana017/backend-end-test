import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookDto {
  @ApiProperty({ example: 'M002', description: 'The code of the book' })
  code: string;

  @ApiProperty({
    example: 'Marvel Avangers',
    description: 'The title of the book',
  })
  title: string;

  @ApiProperty({
    example: 'Jhon doe',
    description: 'The name of the author book',
  })
  author: string;

  @ApiProperty({ example: '1', description: 'qty of the book' })
  stock: number;
}
