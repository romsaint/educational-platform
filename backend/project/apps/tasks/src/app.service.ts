import { HttpException, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { client } from '@app/educational-lib';
import { ITask } from '@app/educational-lib/db/interfaces/tasks/task.interface';
import { TaskWithoutAnswer } from '@app/educational-lib';


@Injectable()
export class AppService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await client.connect();
  }
  async onModuleDestroy() {
    await client.end();
  }

  async allTasks(page: number, onPage: number, lvlSorted: string, tags: string) {
    if (page <= 0 || onPage <= 0) {
      return [];
    }
    let lvlSortedQuery

    if (lvlSorted === 'toLow') {
      lvlSortedQuery = `
        CASE level
          WHEN 'Easy' THEN 3
          WHEN 'Medium' THEN 2
          WHEN 'Hard' THEN 1
        END
      `;
    } else {
      lvlSortedQuery = `
        CASE level
          WHEN 'Easy' THEN 1
          WHEN 'Medium' THEN 2
          WHEN 'Hard' THEN 3
        END
      `;
      
    }
    let tagsQuery
    let k = 1
    if(tags && typeof tags === 'string') {
      k += 1
      tagsQuery = `AND tags LIKE $1`
      tags.split(',').map((val, idx) => {
        if(idx > 0) {
          k += 1
          tagsQuery += ` OR tags LIKE $${idx + 1}`
        }
      })
    }
    const queryText = `
    SELECT id, level, title, tags, date_created, likes
    FROM tasks
    WHERE iscommited = true ${tagsQuery ? tagsQuery : ''}
    ORDER BY ${lvlSortedQuery}
    LIMIT $${k > 1 ? k : '1'} ${tagsQuery ? '' : k > 1 ? k + 1 : ' OFFSET $2'}
    `;
    let tasks
    console.log(queryText)
    if(tagsQuery) {
      tasks = await client.query(queryText, [...tags.split(',').map(val => `%${val}%`), onPage])
    }else{
      tasks = await client.query(queryText, [onPage, (page - 1) * onPage])
    }

    return {tasks: tasks.rows, quantity: tasks.rows.length};
  }

  async task(id: number): Promise<TaskWithoutAnswer> {
    const task: ITask = (await client.query(`
        SELECT * FROM tasks
        WHERE id = $1`, [id])).rows[0]
    
    const {answer, ...data} = task
 
    return data;
  }

  async tasksByTag(tags: string) {
    try{
      const tagArray = tags.split(',').map(tag => `%${tag.trim()}%`);

      let queryText = `SELECT id, title, tags FROM tasks`;
      if (tagArray.length > 0) {
        queryText += ` WHERE ${tagArray.map((_, index) => `tags LIKE $${index + 1}`).join(' OR ')}`;
      }
      queryText += ' LIMIT 5'
      const tasks = (await client.query(queryText, tags.split(',').map(val => `%${val.trim()}`))).rows

      return tasks
    }catch(e) {
      if(e instanceof Error) {
        throw new HttpException(e.message, 500)
      }else{
        throw new HttpException('Error', 500)
      }
    }
  }

  async allTags(): Promise<string[]> {
    const tags = (await client.query(`
      WITH split_tags AS (
          SELECT UNNEST(STRING_TO_ARRAY(tags, ',')) AS tag
          FROM tasks
      ) 
      select distinct TRIM(tag) from split_tags
  `)).rows
 
  return tags
  }
}