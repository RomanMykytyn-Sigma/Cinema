import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Film } from '../schemas/film.schema';
import { Model } from 'mongoose';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  async findAllByGenres(genreFilter: Array<string>) {
    return this.filmModel.find({ genre: { $in: genreFilter } }).populate('genre');
  }

  async findAllByFavorites(favorites: Array<string>) {
    return this.filmModel.find({ _id: { $in: favorites } }).populate('genre');
  }

  async findAll() {
    return this.filmModel.find({}).populate('genre');
  }

  async findOne(filmId: string) {
    return this.filmModel.findById(filmId).exec();
  }
}
