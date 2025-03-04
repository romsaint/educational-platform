import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('')
  async allTasks(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('onPage', ParseIntPipe) onPage: number = 5,
    @Query('lvlSorted') lvl: string = 'toLow',
    @Query('tags') tags: string = '',
    @Query('date') date: 'old' | 'new' | null = null,
    @Query('level') level: 'Easy' | "Medium" | "Hard" | 'undefined',
  ) {
    return await this.tasksService.allTasks(page, onPage, lvl, tags, date, level);
  }

  @Get('task/:id')
  async task(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.task(id);
  }

  @Post('tasksByTag')
  async tasksByTag(@Body() data) {
    return await this.tasksService.tasksByTag(data.tags, data.id)
  }

  @Get('all-tags')
  async allTags(): Promise<string[] | {[key: string]: any}> { 
    return this.tasksService.allTags()
  }

  @Get('uncommited-tasks')
  async uncommitedTasks(): Promise<string[] | {[key: string]: any}> { 
    return this.tasksService.uncommitedTasks()
  }

  @Post('create-task')
  async createTask(@Body() task) { 
    return await this.tasksService.createTask(task)
  }

  @Post('commit-task')
  async commitTask(@Body() task: {taskId: number, role: string}) { 
    return await this.tasksService.commitTask(task)
  }
}