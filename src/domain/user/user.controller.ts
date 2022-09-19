import { Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(createUser: CreateUserRequest): Promise<number> {
    return this.userService.createUser(createUser);
  }

  @Get('/:id')
  findUser(@Param('id') id: number) {}
}
