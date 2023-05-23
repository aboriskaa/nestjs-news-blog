import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from 'src/news/news.entity';
import { CreateUserDto } from '../users/dtos/create-user-dto';
import { UsersEntity } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(user: CreateUserDto) {
    const usersEntity = new UsersEntity();
    usersEntity.firstName = user.firstName;

    return this.usersRepository.save(usersEntity);
  }

  async findById(id: any) {
    return this.usersRepository.findOne(id);
  }
}
