import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentsModel: Model<Comment>) {}

  async createNew(createCommentDto: CreateCommentDto) {
    return new this.commentsModel(createCommentDto);
  }

  async getByFilm(filmId: string) {
    return this.commentsModel.find({ toFilm: filmId }).sort({date: -1});
  }

  /*async findAllByFavorites(favorites: Array<string>) {
    return this.filmModel.find({ _id: { $in: favorites } }).populate('genre');
  }

  async findAll() {
    return this.filmModel.find({}).populate('genre');
  }

  async findOne(filmId: string) {
    return this.filmModel.findById(filmId).exec();
  }*/
}
