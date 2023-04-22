import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  Res,
} from '@nestjs/common';

import { NewsEdit, News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderNewsAll } from 'src/views/news/news-all';
import { renderTemplate } from 'src/views/template';
import { renderNewsDetail } from 'src/views/news/news-detail';

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Get('/all')
  getAllView() {
    const news = this.newsService.getAll();
    const content = renderNewsAll(news);
    return renderTemplate(content, {
      title: 'List news',
      description: 'Cool news',
    });
  }

  @Get('/:id')
  getDetailView(@Param('id') id: string) {
    const news = this.newsService.find(id);

    const comments = this.commentsService.find(id);
    if (!news) {
      // res.redirect('/all');
    }
    const content = renderNewsDetail(news, comments);
    return renderTemplate(content, {
      title: news.title,
      description: news.description,
    });
  }

  @Get('/api/all')
  getAll(): News[] {
    return this.newsService.getAll();
  }

  @Get('/api/:id')
  get(@Param('id') id: string): News {
    const news = this.newsService.find(id);
    const comments = this.commentsService.find(id);

    return {
      ...news,
      comments,
    };
  }

  @Post('/api')
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: NewsEdit): News {
    return this.newsService.edit(id, news);
  }

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {
    const isRemoved = this.newsService.remove(id);
    return isRemoved ? 'Новость удалена' : 'Передан неверный ин';
  }
}
