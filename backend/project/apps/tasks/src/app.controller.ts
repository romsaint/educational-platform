import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async allTasks(
    @Query('page') page: number = 1,
    @Query('onPage') onPage: number = 5,
    @Query('lvlSorted') lvl: string = 'toLow',
    @Query('tags') tags: string = '',
    @Query('date') date: 'old' | 'new' | null = null,
  ) {
    return await this.appService.allTasks(page, onPage, lvl, tags, date);
  }

  @Get('task/:id')
  async task(@Param('id', ParseIntPipe) id: number) {
    return await this.appService.task(id);
  }

  @Post('tasksByTag')
  async tasksByTag(@Body('tags') data: string) {
    return await this.appService.tasksByTag(data)
  }

  @Get('all-tags')
  async allTags(): Promise<string[]> { 
    return this.appService.allTags()
  }
}
