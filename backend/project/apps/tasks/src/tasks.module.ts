import { Module } from '@nestjs/common';
import { AppController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { WatchedService } from './watched/watched.service';
import { SolvedService } from './solved/solved.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TasksService, WatchedService, SolvedService],
})
export class AppModule {}
