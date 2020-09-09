import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { Film, FilmSchema } from './schemas/film.schema';
import { User, UserSchema } from './schemas/user.schema';
import { FilmsModule } from './films/films.module';
import dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client'),
    }),
    MongooseModule.forRoot(process.env.DB_CONNECT),
    MongooseModule.forFeature([{ name: Genre.name, schema: GenreSchema }]),
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    UsersModule,
    FilmsModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
