import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: process.env.DB_HOST || configService.get('DB_HOST'),
        port: Number(process.env.DB_PORT) || configService.get('DB_PORT'),
        entities: [__dirname + '/../**/*.entity.{js,ts}'],
        database: process.env.DB_NAME || configService.get('DB_NAME'),
        username: process.env.DB_USERNAME || configService.get('DB_USERNAME'),
        password: process.env.DB_PASSWORD || configService.get('DB_PASSWORD'),
        synchronize: true,
        autoLoadEntities: true,
        logging: true,
        timezone: 'Asia/Seoul',
      }),
    }),
  ],
})
export class TypeOrmConfig {}
