import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

/* @Module => Decorator
.* 클래스에 함수 기능을 추가할 수 있게 해줌
.* 클래스 위의 함수
.*/
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {} // root Module
