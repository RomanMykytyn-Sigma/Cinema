import { Controller, Get, Req, Res } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Response, Request } from 'express';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('getAll')
  getAll(@Req() req: Request, @Res() res: Response) {
    return this.filmsService.getAll(req, res);
  }
}
