import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCommentDto } from './dtos/create-comment-dto';

export type Comment = {
  id?: string;
  message: string;
  author: string;
  avatar?: string;
};

export type CommentEdit = {
  message?: string;
  author?: string;
  avatar?: string;
};

@Injectable()
export class CommentsService {
  private readonly comments = {};

  create(idNews: string, comment: CreateCommentDto) {
    if (!this.comments[idNews]) {
      this.comments[idNews] = [];
    }
    const id: string = uuid();

    const newComment = { ...comment, id: id };
    this.comments[idNews].push(newComment);
    return newComment;
  }

  edit(idNews: string, idComment: string, comment: Comment) {
    const indexComment = this.comments[idNews]?.findIndex(
      (c: any) => c.id === idComment,
    );
    if (!this.comments[idNews] || indexComment) {
      return false;
    }

    this.comments[idNews][indexComment] = {
      ...this.comments[idNews][indexComment],
      ...comment,
    };

    return this.comments[idNews][indexComment];
  }

  find(idNews: string): CreateCommentDto[] | null {
    return this.comments[idNews] || null;
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
