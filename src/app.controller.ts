import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getData')
  getData(@Req() req: Request, @Res() res: Response) {
    return this.appService.getData(req, res);
  }
}
