import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../schemas/film.schema';
import { FilmsController } from './films.controler';

@Module({
  imports: [MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]), 
            UsersModule],
  controllers: [FilmsController],
  providers: [FilmsService],
  exports: [],
})
export class FilmsModule {}