import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comments/comments.service';
import { NewsEntity } from './news.entity';

export interface News {
  id?: string;
  title: string;
  description: string;
  author?: string;
  countView?: number;
  comments?: Comment[];
  cover?: string;
}

export interface NewsEdit {
  title?: string;
  description?: string;
  author?: string;
  countView?: number;
  cover?: string;
}

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity)
    private newsRepository: Repository<NewsEntity>,
  ) {}

  async create(news: News): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    return this.newsRepository.save(newsEntity);
  }

  async findById(id: any): Promise<NewsEntity> {
    return this.newsRepository.findOne(id);
  }

  async getAll(): Promise<NewsEntity[]> {
    return this.newsRepository.find({});
  }

  async edit(id: number, news: NewsEdit): Promise<NewsEntity | null> {
    const editableNews = await this.findById(id);
    if (editableNews) {
      const newNewsEntity = new NewsEntity();
      newNewsEntity.description = news.description || editableNews.description;
      newNewsEntity.title = news.title || editableNews.title;
      newNewsEntity.cover = news.cover || editableNews.cover;

      return this.newsRepository.save(newNewsEntity);
    }
    return null;
  }

  async remove(id: any): Promise<NewsEntity | null> {
    const removeNews = await this.findById(id);
    if (removeNews) {
      return this.newsRepository.remove(removeNews);
    }
    return null;
  }
}
