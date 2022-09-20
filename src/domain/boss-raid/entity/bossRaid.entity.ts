import { User } from 'src/domain/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BossRaidStatus } from './bossRaid.status';

@Entity()
export class BossRaid {
  //{ raidRecordId:number, score:number, enterTime:string, endTime:string

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  // 처음 시작할때 스코어 포함 x
  @Column({
    default: 0,
  })
  score: number;

  @Column({
    type: 'enum',
    enum: BossRaidStatus,
  })
  raidStatus: BossRaidStatus;

  @Column()
  startTime: Date;

  @Column({
    nullable: true,
  })
  endTime: Date;

  @ManyToOne(() => User, (user) => user.raidHistory)
  @JoinColumn()
  user: User;

  public canEnter(): boolean {
    return true;
  }
}
