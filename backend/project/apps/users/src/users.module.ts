import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';


@Module({
  imports: [AuthModule],
  controllers: [UsersController, AuthController],
  providers: [UsersService],
})
export class UsersModule {}
