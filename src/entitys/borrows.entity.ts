import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Borrows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  borrowed_time: Date;

  @Column()
  borrowed_member_code: string;

  @Column()
  borrowed_book_code: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp', default: null })
  returned_time: Date;
}
