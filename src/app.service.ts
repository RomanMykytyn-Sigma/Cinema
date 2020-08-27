import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './schemas/genre.schema';
import { Model } from 'mongoose';
import { Response, Request } from 'express';

@Injectable()
export class AppService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}

  async getData(req: Request, res: Response) {
    const user = req.isAuthenticated() ? req?.user : {};
    const listGenres = await this.genreModel.find({}).lean(true);
    res.status(200).json({user, listGenres});
    
  }
}
