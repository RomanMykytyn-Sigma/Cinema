import { Controller, Get, Req, Res } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Response, Request } from 'express';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('getAll')
  async getAll() {
    const listFilms = await this.filmsService.getAll();
    return { listFilms };
  }
}
