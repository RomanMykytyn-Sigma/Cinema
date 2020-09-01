import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre } from './schemas/genre.schema';
import { Film } from './schemas/film.schema';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Response, Request } from 'express';

@Injectable()
export class AppService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>,
              @InjectModel(Film.name) private filmModel: Model<Film>,
              @InjectModel(User.name) private userModel: Model<User>) {}

  async getData(req: Request, res: Response) {
    let user = {};
    if (req.isAuthenticated()) {
      user = await this.userModel.findOne({login: req.user['login']});;
    } 
    //const user = req.isAuthenticated() ? req?.user : {};
    const listGenres = await this.genreModel.find({});
    const listFilms = await this.filmModel.find({}).populate('genre');
    res.status(200).json({user, listGenres, listFilms});
    
  }
}
