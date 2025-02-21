import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('tasks')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async getHello(
    @Query('page') page: number = 1,
    @Query('onPage') onPage: number = 10) {
    return await this.appService.allTasks(page, onPage);
  }

  @Get('quantity-tasks')
  async quantityTasks() {
    return await this.appService.quantityTasks();
  }

  @Get('task/:id')
  async task(@Param('id', ParseIntPipe) id: number) {
    return await this.appService.task(id);
  }

  @Post('tasksByTag')
  async tasksByTag(@Body('tags') data: string) {
    return await this.appService.tasksByTag(data)
  }
}
