import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AvatarService } from './avatar/avatar.service';


@Module({
  imports: [AuthModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AvatarService],
})
export class UsersModule {}
