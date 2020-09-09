import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../schemas/comment.schema';
import { CommentsController } from './comments.controler';

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [],
})
export class CommentsModule {}