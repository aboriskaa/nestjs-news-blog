import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  @Render('index')
  root() {
    return {
      messages: [
        { message: 'Hello!', author: 'Boris' },
        { message: 'Hello!', author: 'Boris2' },
      ],
      name: 'Borika',
    };
  }
}
