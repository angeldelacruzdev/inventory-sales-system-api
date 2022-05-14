import { RequestMethod, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  

  app.setGlobalPrefix('v1', {
    exclude: [
      { path: 'auth/login', method: RequestMethod.POST },
      { path: 'auth/logout', method: RequestMethod.POST },
      { path: 'auth/refresh', method: RequestMethod.POST },
      { path: 'auth/register', method: RequestMethod.POST },
    ],
  });

  await app.listen(process.env.PORT);
}
bootstrap();
