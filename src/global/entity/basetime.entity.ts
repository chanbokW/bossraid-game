import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseTimeEntity {
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
  })
  updateAt: Date;
}
