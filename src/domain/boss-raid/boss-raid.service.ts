import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import getKoreaTime from 'src/global/util/time.util';
import { DataSource } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { BossRaidStartRequestDto } from './dto/bossRaid.start.dto';
import { BossRaidRecord } from './entity/bossRaid.entity';
import { BossRaidStatus } from './entity/bossRaid.status';

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

    const bossRaid: BossRaidRecord = await queryRunner.manager.find(
      BossRaidRecord,
      {
        relations: {
          user: true,
        },
        order: { id: 'desc' },
        take: 1,
      },
    )[0];

    if (!bossRaid || bossRaid.canEnter()) {
      return {
        canEnter: true,
      };
    }
    // Todo 클래스로 빼기
    return {
      canEnter: false,
      canteredUserId: bossRaid.user?.id,
    };
  }

  /**
   * @description: bossRaid 시작
   */
  public async startBoss(bossRaidStartRequestDto: BossRaidStartRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    const user: User = await queryRunner.manager.findOneBy(User, {
      id: bossRaidStartRequestDto.userId,
    });

    if (!user) {
      throw new HttpException(
        '존재하지 않은 회원입니다.',
        HttpStatus.NOT_FOUND,
      );
    }
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      return await queryRunner.manager
        .createQueryBuilder(BossRaidRecord, 'record')
        .setLock('pessimistic_read')
        .orderBy('id', 'DESC')
        .getOne()
        .then(async (data) => {
          //todo 예외 상태코드변경
          if (data && !data.canEnter()) {
            throw new HttpException(
              {
                isEntered: false,
                message: '현재 입장 하실 수 없습니다.',
              },
              HttpStatus.BAD_REQUEST,
            );
          }

          const raidStart = await queryRunner.manager.save(BossRaidRecord, {
            level: bossRaidStartRequestDto.level,
            user: user,
            raidStatus: BossRaidStatus.START,
            startTime: getKoreaTime(),
          });
          await queryRunner.commitTransaction();
          return {
            isEntered: true,
            reaidRecordId: raidStart.id,
          };
        });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * @description : bossRaid 종료
   */
  public async endBoss() {}
}
