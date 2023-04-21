import { Controller, Param, Post, Body, Get, Delete } from '@nestjs/common';
import { Comment, CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/:idNews')
  create(@Param('idNews') idNews: string, @Body() comment: Comment) {
    return this.commentsService.create(idNews, comment);
  }

  @Get('/:idNews')
  get(@Param('idNews') idNews: string) {
    return this.commentsService.find(idNews);
  }

  @Delete('/:idNews/:idComment')
  remove(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
  ) {
    return this.commentsService.remove(idNews, idComment);
  }
}
