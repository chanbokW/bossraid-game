import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfig } from './global/db/typeorm.config';
import { UserModule } from './domain/user/user.module';
import { BossRaidModule } from './domain/boss-raid/boss-raid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmConfig,
    CacheModule.register({
      isGlobal: true,
    }),
    UserModule,
    BossRaidModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
