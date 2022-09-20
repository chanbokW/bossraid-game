import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BossRaidStaticData {
  constructor(private httpService: HttpService) {}

  public async getStaticBossData() {
    return await this.httpService.axiosRef.get(
      'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json',
    );
  }

  public async loadStaticData() {
    const bossData = await this.getStaticBossData();

    console.log('데이터 체크 ', bossData.data);
    console.log('보스레이드 데이터 [] ', bossData.data.bossRaids);
  }
}
