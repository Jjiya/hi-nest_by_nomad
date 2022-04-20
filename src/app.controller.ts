import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// get URL and return function(business logic)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Decorater Get()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 데코레이터와 함수 사이 공백 및 줄바꿈 x
  @Get('/hello')
  sayHello(): string {
    return this.appService.sayHello();
  }
}
