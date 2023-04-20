import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export interface News {
  id?: string;
  title: string;
  description: string;
  author: string;
  countView?: number;
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

  getAll(): News[] | undefined {
    return this.news;
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
