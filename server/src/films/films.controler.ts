import { Controller, Post, Body, Res } from '@nestjs/common';
import { FilmsService } from './films.service';
import { UsersService } from '../users/users.service';
import { AddVoteDto } from '../films/dto/add-vote.dto';
import { Response, Request } from 'express';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService,
              private readonly usersService: UsersService) {}

  @Post('filterByGenres')
  async filterByGenres(@Body() genres: Array<string>) {
    if (!genres.length) {
      return await this.filmsService.findAll();
    }
    return await this.filmsService.findAllByGenres(genres);
  }

  @Post('filterByFavorites')
  async filterByFavorites(@Body() favorites: Array<string>) {
    return await this.filmsService.findAllByFavorites(favorites);
  }

  @Post('addVote')
  async addVote(@Body() addVote: AddVoteDto, @Res() res: Response) {
    const { login, filmId, voteValue } = addVote;
    const film = await this.filmsService.findOne(filmId);
    const user = await this.usersService.findOne(login);
    if (!film || !user) {
      return {error: 'Film or user not found.'};
    }
    film.rating.push(voteValue);
    user.ratedFilms.push(filmId);
    film.save(err => {
      if (err) {
        res.json({error: err});
        return;
      }
      user.save(err => {
        if (err) {
          res.json({error: err});
          return;
        }
        res.json({});
      });
    });
  }
}
