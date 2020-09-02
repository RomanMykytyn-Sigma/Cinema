import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getData')
  getData(@Req() req: Request) {
    const data = this.appService.getData(req);
    return data;
  }
}
