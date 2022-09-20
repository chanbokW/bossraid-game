import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BossRaidStaticData } from './bass-raid.static.data';
import { BossRaidService } from './boss-raid.service';
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
  startBoss(@Body() bossRaidStartRequestDto: BossRaidStartRequestDto) {
    return this.bossRaidService.startBoss(bossRaidStartRequestDto);
  }

  @Get('/boss')
  getBoss() {
    return this.bossRaidStaticData.loadStaticData();
  }
}
