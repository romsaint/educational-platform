import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IRegistrationUser } from '@app/educational-lib';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registration')
  async registration(@Body() user: IRegistrationUser, @Res({ passthrough: true }) res: Response) {
    return await this.authService.registration(user, res)
  }
}
