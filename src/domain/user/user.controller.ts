import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(createUser: CreateUserRequest) {
    return this.userService.createUser(createUser);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findUserBossHistory(@Param('id') id: number) {
    return this.userService.findUserBossHistory(id);
  }
}
