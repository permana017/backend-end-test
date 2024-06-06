import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Member {
  @PrimaryColumn()
  code: string;

  @Column()
  name: string;

  @Column()
  total_borrow_books: number;

  @Column({ type: 'timestamp', default: null })
  pinalty_date: Date;
}
