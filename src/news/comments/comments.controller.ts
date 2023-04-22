import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Delete,
  Put,
} from '@nestjs/common';
import { Comment, CommentEdit, CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/api/:idNews')
  create(@Param('idNews') idNews: string, @Body() comment: Comment) {
    return this.commentsService.create(idNews, comment);
  }

  @Put('/api/:idNews/:idComment')
  edit(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comment: Comment,
  ) {
    return this.commentsService.create(idNews, comment);
  }

  @Get('/api/:idNews')
  get(@Param('idNews') idNews: string) {
    return this.commentsService.find(idNews);
  }

  @Delete('/api/:idNews/:idComment')
  remove(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
  ) {
    return this.commentsService.remove(idNews, idComment);
  }
}
