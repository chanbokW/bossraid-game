import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { CreateUserRequest } from './dto/create-user.request.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  public async createUser(createUser: CreateUserRequest): Promise<{}> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    const entityManager: EntityManager = await queryRunner.manager;

    const { name } = createUser;
    const user: User = await entityManager.findOneBy(User, {
      nickName: name,
    });
    if (user) {
      throw new HttpException('이미 존재하는 회원입니다.', HttpStatus.CONFLICT);
    }

    await queryRunner.startTransaction();
    try {
      const saveUser = await entityManager.save(User, { nickName: name });
      await queryRunner.commitTransaction();
      return { userId: saveUser.id };
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  public async findUserBossHistory(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();

    // Todo 응답할 데이터 변경 (변수명 )
    return await queryRunner.manager.findOne(User, {
      where: { id },
      relations: {
        raidHistory: true,
      },
    });
  }
}
