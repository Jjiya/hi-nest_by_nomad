import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/* @Module => Decorator
.* 클래스에 함수 기능을 추가할 수 있게 해줌
.* 클래스 위의 함수
.*/
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} // root Module
