import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../schemas/film.schema';
import { FilmsController } from './films.controler';
//import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }])],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [],
})
export class FilmsModule {}