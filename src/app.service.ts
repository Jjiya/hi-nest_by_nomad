import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! \n Hello NestJS';
  }

  sayHello(): string {
    return 'hello~ 왜 쌍따옴표 쓰면 에러나니..';
  }
}
