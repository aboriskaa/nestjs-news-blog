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

  remove(idNews: string, idComment: string): Comment[] | null {
    if (!this.comments[idNews]) {
      return null;
    }
    const indexComment = this.comments[idNews].findIndex(
      (c: any) => c.id === idComment,
    );

    if (indexComment === -1) {
      return null;
    }
    return this.comments[idNews].splice(indexComment, 1);
  }
}
