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

  async allTasks(page: number, onPage: number, lvlSorted: string, tags: string, date: 'old' | 'new' | null) {
    if (page <= 0 || onPage <= 0) {
      return { tasks: [], quantity: 0 }; // Возвращаем пустой массив и 0 для quantity
    }
  
    let lvlSortedQuery: string;
  
    if (lvlSorted === 'toLow') {
      lvlSortedQuery = `
        CASE level
          WHEN 'Easy' THEN 3
          WHEN 'Medium' THEN 2
          WHEN 'Hard' THEN 1
          ELSE 4
        END
      `;
    } else {
      lvlSortedQuery = `
        CASE level
          WHEN 'Easy' THEN 1
          WHEN 'Medium' THEN 2
          WHEN 'Hard' THEN 3
          ELSE 4
        END
      `;
    }
  
    let tagsQuery: string = '';
    const tagValues: string[] = []; // Массив для значений тегов
    let paramIndex = 1; // Индекс для параметров запроса
  
    if (tags && typeof tags === 'string') {
      const tagList = tags.split(',').map(val => `%${val.trim()}%`);
      tagList.forEach((tag, index) => {
        tagsQuery += index === 0 ? ` AND (tags LIKE $${paramIndex}` : ` OR tags LIKE $${paramIndex}`;
        tagValues.push(tag);
        paramIndex++;
      });
      tagsQuery += ')'; // Закрываем скобку для OR-выражений
    }
    
    let dateSortQuery: string = 'date_created DESC'; // Сортировка по умолчанию (newest)
    if (date === 'old') {
      dateSortQuery = 'date_created ASC'; // Сортировка по возрастанию (oldest)
    }
  
    const queryText = `
      SELECT id, level, title, tags, date_created, likes
      FROM tasks
      WHERE iscommited = true ${tagsQuery}
      ORDER BY ${lvlSortedQuery}, ${dateSortQuery}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
  
    const offset = (page - 1) * onPage;
    const queryParams = [...tagValues, onPage, offset];
  
  
    try {
      const tasks = await client.query(queryText, queryParams);
  
      const quantityQuery = `
        SELECT COUNT(id)
        FROM tasks
        WHERE iscommited = true ${tagsQuery}
      `;
  
      const quantity = await client.query(quantityQuery, tagValues);
  
      return { tasks: tasks.rows, quantity: parseInt(quantity.rows[0].count, 10) };
    } catch (error) {
      console.error('Error in allTasks:', error);
      throw error;
    }
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