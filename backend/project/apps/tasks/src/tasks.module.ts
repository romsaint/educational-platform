import { Module } from '@nestjs/common';
import { AppController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TasksService],
})
export class AppModule {}
