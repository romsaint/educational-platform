import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { WatchedService } from './watched/watched.service';
import { SolvedService } from './solved/solved.service';
import { IUserWitoutPassword } from '@app/educational-lib';

@Controller('tasks')
export class AppController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly watchedService: WatchedService,
    private readonly solvedService: SolvedService,

  ) {}

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
  async commitTask(@Body() task: {taskId: number, role: string, id: number}) { 
    return await this.tasksService.commitTask(task)
  }

  @Post('set-watched')
  async setWatched(@Body() task: {taskId: number, userId: number}) { 
    return await this.watchedService.setWatched(task)
  }

  @Post('solve-test-cases')
  async solveTestCases(@Body() testCases: {testCases: string, taskId: number, user: IUserWitoutPassword}){
      return await this.solvedService.solveTestCases(testCases)
  }

  @Post('run-code')
  async runCode(@Body() code: {solveFn: string, testCases: string, taskId: number, userId: number}){
      return await this.solvedService.runCode(code)
  }

  @Post('get-answer')
  async getAnswer(@Body() data: {user: IUserWitoutPassword, taskId: number}){
      return await this.tasksService.getAnswer(data)
  }
}