import { IsNumber } from 'class-validator';

export class BossRaidRankDto {
  @IsNumber()
  userId: number;
}
