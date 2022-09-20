import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BossRaid } from './entity/bossRaid.entity';

@Injectable()
export class BossRaidService {
  constructor(private dataSource: DataSource) {}

  /**
   *
   * description 보스레이드 상태 조회
   * @returns boss Raid 상태
   */
  public async getBossRaidStatus() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const bossRaid = await queryRunner.manager.find(BossRaid, {
      relations: {
        user: true,
      },
      order: { id: 'desc' },
    })[0];

    if (!bossRaid || bossRaid.canEnter()) {
      return {
        canEnter: true,
      };
    }
    // Todo 클래스로 빼기
    return {
      canEnter: false,
      canteredUserId: bossRaid.user?.userId,
    };
  }
}
