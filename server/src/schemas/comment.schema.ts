import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Film } from './film.schema';
const ObjectId = MongooseSchema.Types.ObjectId;

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true, ref: Film.name, type: [ObjectId] })
  toFilm: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);