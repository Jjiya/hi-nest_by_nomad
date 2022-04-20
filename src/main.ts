import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터 없는건 통과 못함
      forbidNonWhitelisted: true, //whitelist에서 통과 못한 속성이 있으면 request 거부
      transform: true, // 타입 형변환
    }),
  ); // dto 유효성 검사
  await app.listen(3000);
}
bootstrap();
