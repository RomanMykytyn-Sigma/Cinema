import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getData')
  getData(@Req() req: Request) {
    const data = this.appService.getData(req);
    return data;
  }

  @Get('watch/*')
  watch(@Req() req: Request, @Res() res: Response) {
    if (!req.isAuthenticated()) {
      res.redirect('/');
    } else {
      res.sendFile('index.html', {root: join(__dirname, '../..', 'client') })
    }
  }

}
