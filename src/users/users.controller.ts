import { Controller, Post, Body, Res, Req, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Response, Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) { 
    this.usersService.create(res, createUserDto);
  }

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto, @Res() res: Response, @Req() req: Request) {
    this.usersService.login(req, res, createUserDto);
  }

  @Get('exit')
  async exit(@Req() req: Request) {
    this.usersService.exit(req);
  }
}