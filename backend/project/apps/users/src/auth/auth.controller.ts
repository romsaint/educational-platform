import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILoginUser, IRegistrationUser } from '@app/educational-lib';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registration')
  async registration(@Body() user: IRegistrationUser) {
    return await this.authService.registration(user)
  }

  @Post('login')
  async login(@Body() user: ILoginUser) {
    return await this.authService.login(user)
  }
}
