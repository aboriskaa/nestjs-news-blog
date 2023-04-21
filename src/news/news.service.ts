import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Comment } from './comments/comments.service';

export interface News {
  id?: string;
  title: string;
  description: string;
  author: string;
  countView?: number;
  comments?: Comment[];
  cover?: string;
}

export interface NewsEdit {
  title?: string;
  description?: string;
  author?: string;
  countView?: number;
}

@Injectable()
export class NewsService {
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

  create(news: News): News {
    const id: string = uuid();
    console.log(id);
    this.news.push({ ...news, id: id });
    return news;
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
