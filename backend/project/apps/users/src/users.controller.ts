import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { IUserWitoutPassword } from '@app/educational-lib';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('check-unique')
  async checkUnique(@Body() data: { uniqueName: string }): Promise<{[key: string]: any}> {
    return await this.usersService.checkUnique(data);
  }

  
  @Get('avatar/:avatar')
  getAvatar(@Param('avatar') avatar: string, @Res() res: Response) {
    return this.usersService.getAvatar(avatar, res)
  }

  @Post('profile')
  async profile(@Body() user: IUserWitoutPassword) {
    return await this.usersService.profile(user)
  }
}