import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class BossRaidStaticData {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  public async getStaticBossData() {
    return await this.httpService.axiosRef.get(
      'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
    );
  }

  public async loadStaticData() {
    const bossData = await this.getStaticBossData();

    const staticData = bossData.data.bossRaid[0];
    // const bossRaidSeconds = bossData.data.bossRaids[0].bossRaidLimitSeconds;

    await this.cacheManager.set('bossRaidSeconds', staticData.bossRaidSeconds);
    await this.cacheManager.set('levels', staticData.levels);
  }
}
