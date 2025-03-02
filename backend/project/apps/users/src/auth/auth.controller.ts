import { BadRequestException, Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ILoginUser, IRegistrationUser, IRegistrationUserWithRole } from '@app/educational-lib';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { uploadFile } from 'apps/shared/uploadFile';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('registration')
  @UseInterceptors(FileInterceptor('file', uploadFile))
  async registration(@Body() user: IRegistrationUser, @UploadedFile() file: Express.Multer.File | undefined) {
    return await this.authService.registration(user, file)
  }

  @Post('login')
  async login(@Body() user: ILoginUser) {
    return await this.authService.login(user)
  }

  @Post('registration-with-role')
  @UseInterceptors(FileInterceptor('file', uploadFile))
  async registrationWithRole(@Body() user: IRegistrationUserWithRole, @UploadedFile() file: Express.Multer.File | undefined) {
    return await this.authService.registrationWithRole(user, file)
  }
}
