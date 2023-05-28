import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../users/dtos/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
