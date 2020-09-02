import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Genre } from './genre.schema';
const ObjectId = MongooseSchema.Types.ObjectId;

@Schema()
export class Film extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  coverImage: string;

  @Prop({ required: true })
  videoSource: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: [String] })
  comments: string[];

  @Prop({ required: true, type: [String] })
  director: string[];

  @Prop([{ ref: Genre.name, type: [ObjectId] }])
  genre: Array<Genre>; 

  @Prop({ required: true })
  reliseDate: Date;

  @Prop({ required: true })
  duration: number;

  @Prop([Number])
  rating: number[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);