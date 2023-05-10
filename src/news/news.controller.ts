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

import { NewsService } from './news.service';
import { CommentsService } from './comments/comments.service';
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
  @Render('news-detail')
  async getDetailView(@Param('id') id: string) {
    const idInt = parseInt(id);
    const news = await this.newsService.findById(idInt);
    if (!news) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'News wasnt found' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const comments = this.commentsService.find(id);
    return {
      news,
      comments,
    };
  }

  @Get('/api/all')
  async getAll(): Promise<NewsEntity[]> {
    return this.newsService.getAll();
  }

  @Get('/api/:id')
  async get(@Param('id') id: string): Promise<NewsEntity> {
    const idInt = parseInt(id);
    const news = this.newsService.findById(idInt);
    if (!news) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'News wasnt found' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return news;
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
  async edit(
    @Param('id') id: string,
    @Body() news: EditNewsDto,
  ): Promise<NewsEntity> {
    const idInt = parseInt(id);

    if (!news) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'News wasnt found' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const newsEditable = await this.newsService.edit(idInt, news);
    return newsEditable;
  }

  @Delete('/api/:id')
  async remove(@Param('id') id: string): Promise<string> {
    const idInt = parseInt(id);
    return this.newsService.remove(idInt);
  }
}
