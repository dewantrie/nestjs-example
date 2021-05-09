import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
