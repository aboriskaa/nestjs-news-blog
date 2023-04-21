import { Controller, Param, Post, Body } from '@nestjs/common';
import { Comment, CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @Post('/:idNews')
  create(@Param('idNews') idNews: string, @Body() comment: Comment) {
    return this.commentsService.create(idNews, comment);
  }
}
