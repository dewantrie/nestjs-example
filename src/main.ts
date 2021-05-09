import { json } from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { AllExceptionFilter } from './filter/all-exception.filter';
import { ConfigService } from '@nestjs/config';

(async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const serviceName = configService.get<string>('API_NAME');
  const servicePort = configService.get<number>('API_PORT');
  const serviceVersion = configService.get<string>('npm_package_version');

  app.useGlobalFilters(new AllExceptionFilter());
  app.use(json({ limit: '10mb' }));

  await app.listen(servicePort, () => {
    console.info(
      `Application ${serviceName}:${serviceVersion} running on port ${servicePort}`,
    );
  });
})();
