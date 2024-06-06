import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Books {
  @PrimaryColumn()
  code: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  stock: number;
}
