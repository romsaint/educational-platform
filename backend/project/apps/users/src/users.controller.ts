import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('check-unique')
  async checkUnique(@Body() data: { uniqueName: string }): Promise<{[key: string]: any}> {
    return await this.usersService.checkUnique(data);
  }
}
