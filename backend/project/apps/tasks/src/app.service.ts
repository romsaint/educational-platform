import { HttpException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
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
    if (page <= 0 || onPage <= 0) {
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

  async task(id: number) {
    const task = await client.query(`
        SELECT * FROM tasks
        WHERE id = $1`, [id])

    return task.rows[0];
  }

  async tasksByTag(tags: string) {
    try{
      const tagArray = tags.split(',').map(tag => `%${tag.trim()}%`);

      let queryText = `SELECT * FROM tasks`;
      if (tagArray.length > 0) {
        queryText += ` WHERE ${tagArray.map((_, index) => `tags LIKE $${index + 1}`).join(' OR ')}`;
      }
      queryText += ' LIMIT 5'
      const tasks = await client.query(queryText, tags.split(',').map(val => `%${val.trim()}`))
      console.log(queryText, tags)
      return tasks.rows;
    }catch(e) {
      if(e instanceof Error) {
        throw new HttpException(e.message, 500)
      }else{
        throw new HttpException('Error', 500)
      }
    }
  }
}