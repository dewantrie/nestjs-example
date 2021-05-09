import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async save(@Body() userDto: UserDto): Promise<any> {
    const user = await this.userService.save(userDto);
    return {
      data: user,
    };
  }

  @Get()
  async get(): Promise<any> {
    const users = await this.userService.findAll();
    return {
      data: users,
    };
  }
}
