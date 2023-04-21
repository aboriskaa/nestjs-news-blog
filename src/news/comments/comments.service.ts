import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export type Comment = {
  id?: string;
  message: string;
  author: string;
};

@Injectable()
export class CommentsService {
  private readonly comments = {};

  create(idNews: string, comment: Comment) {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    const id: string = uuid();
    this.comments[idNews].push({ ...comment, id: id });
    return comment;
  }

  find(idNews: string): Comment[] | undefined {
    return this.comments[idNews] || undefined;
  }
}
