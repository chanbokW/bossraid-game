import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { BossRaidStaticData } from './bass-raid.static.data';
import { BossRaidService } from './boss-raid.service';
import { BossRaidEndRequestDto } from './dto/bossRaid.end.dto';
import { BossRaidRankDto } from './dto/bossRaid.rank.dto';
import { BossRaidStartRequestDto } from './dto/bossRaid.start.dto';

@Controller('bossRaid')
export class BossRaidController {
  constructor(
    private bossRaidService: BossRaidService,
    private bossRaidStaticData: BossRaidStaticData,
  ) {}

  @Get()
  @HttpCode(200)
  getBossRaidStatus() {
    return this.bossRaidService.getBossRaidStatus();
  }

  @Post('enter')
  @HttpCode(HttpStatus.CREATED)
  startBossRaid(@Body() bossRaidStartRequestDto: BossRaidStartRequestDto) {
    return this.bossRaidService.startBoss(bossRaidStartRequestDto);
  }

  @Patch('end')
  endBossRaid(@Body() bossRaidEndRequestDto: BossRaidEndRequestDto) {
    return this.bossRaidService.endBoss(bossRaidEndRequestDto);
  }

  @Get('topRankerList')
  getLankingList(@Body() bossRaidRankDto: BossRaidRankDto) {
    return this.bossRaidService.getRank(bossRaidRankDto);
  }
}
