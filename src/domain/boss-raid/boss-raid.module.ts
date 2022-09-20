import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { BossRaidStaticData } from './bass-raid.static.data';
import { BossRaidController } from './boss-raid.controller';
import { BossRaidService } from './boss-raid.service';
import { BossRaid } from './entity/bossRaid.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BossRaid, User]), HttpModule],
  controllers: [BossRaidController],
  providers: [BossRaidService, BossRaidStaticData],
})
export class BossRaidModule {}
