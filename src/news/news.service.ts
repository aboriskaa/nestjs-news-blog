import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
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

  private readonly news: News[] = [
    {
      id: 'testid',
      title: 'One news',
      description: 'Its a one news',
      author: 'Boris',
      countView: 12,
      cover:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IpVu979gZT8HBx7AoO5v_WPiVcBY829MmpSKShS0&s',
    },
  ];

  async create(news: News): Promise<NewsEntity> {
    const newsEntity = new NewsEntity();
    newsEntity.title = news.title;
    newsEntity.description = news.description;
    newsEntity.cover = news.cover;
    return this.newsRepository.save(newsEntity);
  }

  find(id: News['id']): News | undefined {
    return this.news.find((news: News) => news.id === id);
  }

  getAll(): News[] | [] {
    return this.news.length ? this.news : [];
  }

  edit(id: string, news: NewsEdit): News | undefined {
    const indexEditableNews = this.news.findIndex((news) => news.id === id);
    if (indexEditableNews !== -1) {
      this.news[indexEditableNews] = {
        ...this.news[indexEditableNews],
        ...news,
      };
      return this.news[indexEditableNews];
    }
    return undefined;
  }

  remove(id: News['id']): boolean {
    const indexRemoveNews = this.news.findIndex((news) => news.id === id);
    if (indexRemoveNews !== -1) {
      this.news.splice(indexRemoveNews, 1);
      return true;
    }
    return false;
  }
}
