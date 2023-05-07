import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  HttpException,
  HttpStatus,
  Render,
} from '@nestjs/common';

import { News, NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
import { renderTemplate } from 'src/views/template';
import { renderNewsDetail } from 'src/views/news/news-detail';
import { CreateNewsDto } from './dtos/create-news-dto';
import { EditNewsDto } from './dtos/edit-news-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { HelperFileLoader } from 'src/utils/HelperFileLoader';
import { MailService } from 'src/mail/mail.service';
import { NewsEntity } from './news.entity';

const PATH_NEWS = '/news-static/';
HelperFileLoader.path = PATH_NEWS;

@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentsService: CommentsService,
    private mailService: MailService,
  ) {}

  @Get('/all')
  @Render('news-list')
  getAllView() {
    const news = this.newsService.getAll();
    return { news, title: 'List of news' };
  }

  @Get('/create/news')
  @Render('create-news')
  async createView() {
    return {};
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
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: HelperFileLoader.destinationPath,
        filename: HelperFileLoader.customFileName,
      }),
    }),
  )
  async create(
    @Body() news: CreateNewsDto,
    @UploadedFile() cover: Express.Multer.File,
  ): Promise<NewsEntity> {
    const fileExtension = cover.originalname.split('.').reverse()[0];

    if (!fileExtension || !fileExtension.match(/(jpg|jpeg|png|gif)$/)) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Not correct data format',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const coverPath = undefined;
    if (cover?.filename) {
      news.cover = PATH_NEWS + cover.filename;
    }

    const _news = await this.newsService.create({ ...news, cover: coverPath });
    // await this.mailService.sendNewNewsForAdmins(
    //   ['snezhkinv@yandex.ru', 'snezhkinv20@gmail.com'],
    //   _news,
    // );
    return _news;
  }

  @Put('/api/:id')
  edit(@Param('id') id: string, @Body() news: EditNewsDto): News {
    return this.newsService.edit(id, news);
  }

  @Delete('/api/:id')
  remove(@Param('id') id: string): string {
    const isRemoved = this.newsService.remove(id);
    return isRemoved ? 'Новость удалена' : 'Передан неверный ин';
  }
}
