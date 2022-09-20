import { Controller, Get } from '@nestjs/common';
import { resourceUsage } from 'process';
import { BossRaidStaticData } from './bass-raid.static.data';

@Controller('bossRaid')
export class BossRaidController {
  constructor(private bossRaidStaticData: BossRaidStaticData) {}

  @Get()
  getBossRaidData() {
    return this.bossRaidStaticData.loadStaticData();
  }
}
