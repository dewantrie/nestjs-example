import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './controller/health.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TerminusModule, ConfigModule],
  exports: [],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
