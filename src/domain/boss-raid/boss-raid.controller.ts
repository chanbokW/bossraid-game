import { Controller, Get } from '@nestjs/common';
import { resourceUsage } from 'process';
import { BossRaidStaticData } from './bass-raid.static.data';
import { BossRaidService } from './boss-raid.service';

@Controller('bossRaid')
export class BossRaidController {
  constructor(
    private bossRaidService: BossRaidService,
    private bossRaidStaticData: BossRaidStaticData,
  ) {}

  @Get()
  getBossRaidStatus() {
    return this.bossRaidService.getBossRaidStatus();
  }
}
