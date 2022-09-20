import { BossRaidRecord } from 'src/domain/boss-raid/entity/bossRaid.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @OneToMany(() => BossRaidRecord, (bossRaid) => bossRaid.user)
  raidHistory: BossRaidRecord[];
}
