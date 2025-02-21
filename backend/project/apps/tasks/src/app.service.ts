import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { client } from '@app/educational-lib';

@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
      await client.connect();
  }
  async onModuleDestroy() {
      await client.end();
  }

  async allTasks(page: number, onPage: number) {
    if(page <= 0 || onPage <= 0) { 
      return [];
    }

    const tasks = await client.query(`
        SELECT * FROM tasks
        LIMIT $1 OFFSET $2
        `, [onPage, (page - 1) * onPage])

    return tasks.rows;
  }

  async quantityTasks() {
    const tasks = await client.query(`
        SELECT COUNT(id) FROM tasks`
      )
        
    return tasks.rows[0];
  }
}