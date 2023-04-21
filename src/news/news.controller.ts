import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';

import { NewsEdit, News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get('/all')
  getAll(): News[] {
    return this.newsService.getAll();
  }

  @Get('/:id')
  get(@Param('id') id: string): News {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);

    return {
      ...news,
      comments,
    };
  }

  @Post()
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }

  @Put('/:id')
  edit(@Param('id') id: string, @Body() news: NewsEdit): News {
    return this.newsService.edit(id, news);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): string {
    const isRemoved = this.newsService.remove(id);
    return isRemoved ? 'Новость удалена' : 'Передан неверный ин';
  }
}
