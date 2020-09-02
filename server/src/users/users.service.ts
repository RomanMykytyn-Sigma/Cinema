import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service'
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<User>, private authService: AuthService) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return new this.userModel(createUserDto);
  }

  async login(createUserDto: CreateUserDto): Promise<User | undefined> {
    const{ login, password } = createUserDto;
    return this.authService.validateUser(login, password);
  }

  async setFavorites(userName: string): Promise<User | undefined> {
    return this.userModel.findOne({login: userName});
  }

}