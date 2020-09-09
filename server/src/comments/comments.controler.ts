import { Controller, Post, Body, Res } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Response } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('add')
  async createNew(@Body() createCommentDto: CreateCommentDto, @Res() res: Response) {
    const comment = await this.commentsService.createNew(createCommentDto);
    comment.save((err, comment) => {
      if (err) {
        res.status(403).json({error: err})
      } else {
          res.status(201).json({comment});
        };
    });
  }

  @Post('getByFilm')
  async getByFilm(@Body() data: {filmId: string}) {
    const comments = await this.commentsService.getByFilm(data.filmId);
    return comments;
  }

}
