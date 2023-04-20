import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { News, NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/:id')
  get(@Param('id') id: string): News {
    return this.newsService.find(id);
  }

  @Post()
  create(@Body() news: News): News {
    return this.newsService.create(news);
  }

  @Delete('/:id')
  remove(@Param('id') id: string): string {
    const isRemoved = this.newsService.remove(id);
    return isRemoved ? 'Новость удалена' : 'Передан неверный ин';
  }
}
