import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async allTasks(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('onPage', ParseIntPipe) onPage: number = 5,
    @Query('lvlSorted') lvl: string = 'toLow',
    @Query('tags') tags: string = '',
    @Query('date') date: 'old' | 'new' | null = null,
    @Query('level') level: 'Easy' | "Medium" | "Hard" | 'undefined',
  ) {
    return await this.appService.allTasks(page, onPage, lvl, tags, date, level);
  }

  @Get('task/:id')
  async task(@Param('id', ParseIntPipe) id: number) {
    return await this.appService.task(id);
  }

  @Post('tasksByTag')
  async tasksByTag(@Body() data) {
    return await this.appService.tasksByTag(data.tags, data.id)
  }

  @Get('all-tags')
  async allTags(): Promise<string[]> { 
    return this.appService.allTags()
  }

  @Post('create-task')
  async createTask(@Body() task) { 
    return await this.appService.createTask(task)
  }
}
