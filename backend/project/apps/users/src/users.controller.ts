import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';


@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('check-unique')
  async checkUnique(@Body() data: { uniqueName: string }): Promise<{[key: string]: any}> {
    return await this.usersService.checkUnique(data);
  }

  @Get('test')
  asdasd(@Req() req: Request) {
    console.log(req.signedCookies.user)
    return req.signedCookies.user
  }
}