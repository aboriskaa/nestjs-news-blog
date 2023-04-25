import {
  Controller,
  Param,
  Post,
  Body,
  Get,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Comment, CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment-dto';
import { EditCommentDto } from './dtos/edit-cpmment-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';

const PATH_COMMENTS = '/news-static/comments/';
HelperFileLoader.path = PATH_COMMENTS;

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/api/:idNews')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  create(
    @Param('idNews') idNews: string,
    @Body() comment: CreateCommentDto,
    @UploadedFile() avatar: Express.Multer.File,
  ): Comment {
    if (avatar?.filename) {
      comment.avatar = PATH_COMMENTS + avatar.filename;
    }

    return this.commentsService.create(idNews, comment);
  }

  @Put('/api/:idNews/:idComment')
  edit(
    @Param('idNews') idNews: string,
    @Param('idComment') idComment: string,
    @Body() comment: EditCommentDto,
  ) {
    return this.commentsService.edit(idNews, idComment, comment);
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
