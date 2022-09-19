import { BossRaid } from 'src/domain/boss-raid/entity/bossRaid.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @OneToMany(() => BossRaid, (bossRaid) => bossRaid.user)
  raidHistory: BossRaid[];
}
