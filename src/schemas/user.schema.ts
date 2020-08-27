import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Film } from './film.schema';
const ObjectId = MongooseSchema.Types.ObjectId;

@Schema()
export class User extends Document {

  @Prop({ required: true, unique : true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop([{ ref: Film.name, type: ObjectId }])
  favorites: Array<Film>; 

  @Prop([{ ref: Film.name, type: ObjectId }])
  ratedFilms: Array<Film>; 

}

export const UserSchema = SchemaFactory.createForClass(User);