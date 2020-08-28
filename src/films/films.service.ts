import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from '../schemas/film.schema';
import { Model } from 'mongoose';
import { Response, Request } from 'express';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async getAll(req: Request, res: Response) {
    const listFilms = await this.filmModel.find({}).lean(true);
    res.status(200).json({ listFilms });
    
  }
}
