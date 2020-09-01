import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { SetUserFavoritesDto } from './dto/set-user-favorites.dto';
import { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service'
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private authService: AuthService) {}

  async create(res: Response, createUserDto: CreateUserDto): Promise<User | undefined> {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const user = new this.userModel(createUserDto);
    return user.save((err) => {
      if (err) {
        res.status(403).json(err)
      } else {
          res.status(201).json({user});
        };
    });
  }

  async login(req: Request, res: Response, createUserDto: CreateUserDto): Promise<User | undefined> {
    const{ login, password } = createUserDto;
    const user = await this.authService.validateUser(login, password);
    if (user) {
      req.logIn(user, err => {
        if (err) {
          res.status(401).end();
          return;
        }
        res.status(201).json({user});
      });
    } else {
      res.status(401).end();
    }
    return;
  }

  async setFavorites(res: Response, favoritesData: SetUserFavoritesDto): Promise<User | undefined> {
    const { userName, favorites } = favoritesData;
    this.userModel.findOneAndUpdate({login: userName}, {favorites: favorites}, (err) => {
      if (err) {
        res.status(403).end();
        return
      }
      res.status(201).end();
    });
    return;
  }

  async exit(req: Request): Promise<User | undefined> {
    req.logout();
    return ;
  }

}