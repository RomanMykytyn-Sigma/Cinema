import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SetUserFavoritesDto } from './dto/set-user-favorites.dto';
import { UsersService } from './users.service';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) { 
    const user = await this.usersService.create(createUserDto);
    user.save((err) => {
      if (err) {
        res.status(403).json({error: err})
      } else {
          res.status(201).json({user});
        };
    });
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response, @Req() req: Request) {
    const user = await this.usersService.login(createUserDto);
    if (user) {
      req.logIn(user, err => {
        if (err) {
          res.status(401).json({error: err});
          return;
        }
        res.status(201).json({user});
      });
    } else {
      res.status(401).json({error: 'Error'});
    }
  }

  @Post('setFavorites')
  async setFavorites(@Body() favoritesData: SetUserFavoritesDto, @Res() res: Response) {
    const { userName, favorites } = favoritesData;
    const user = await this.usersService.setFavorites(userName);
    user.favorites = favorites;
    user.save( err => {
      if (err) {
        res.status(403).end();
        return
      }
      res.status(201).end();
    });
  }

  @Get('logOut')
  async exit(@Req() req: Request) {
    req.logout();
  }
}