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

  async allTasks(
    page: number,
    onPage: number,
    lvlSorted: string,
    tags: string,
    date: 'old' | 'new' | null,
    level: 'Easy' | 'Medium' | 'Hard' | 'undefined'
  ) {

    if (page <= 0 || onPage <= 0) {
      return { tasks: [], quantity: 0 };
    }

    let levelSortQuery: string = ''

    if (!level || level === 'undefined') {
      if (lvlSorted === 'toLow') {
        levelSortQuery = `
          CASE level
            WHEN 'Easy' THEN 3
            WHEN 'Medium' THEN 2
            WHEN 'Hard' THEN 1
            ELSE 4
          END`;
      } else {
        levelSortQuery = `
          CASE level
            WHEN 'Easy' THEN 1
            WHEN 'Medium' THEN 2
            WHEN 'Hard' THEN 3
            ELSE 4
          END`;
      }
    }

    let tagsQuery: string = '';
    const tagValues: string[] = [];
    let paramIndex = 1;

    if (tags && typeof tags === 'string') {
      const tagList = tags.split(',').map((val) => `%${val.trim()}%`);
      tagList.forEach((tag, index) => {
        tagsQuery += index === 0 ? ` AND (tags LIKE $${paramIndex}` : ` OR tags LIKE $${paramIndex}`;
        tagValues.push(tag);
        paramIndex++;
      });
      tagsQuery += ')';
    }

    let dateSortQuery: string = 'date_created DESC';
    if (date === 'old') {
      dateSortQuery = 'date_created ASC';
    }

    let levelFilterQuery: string = '';
    if (level && level !== 'undefined') {
      levelFilterQuery = ` AND level = '${level}'`;
    }

    const queryText = `
      SELECT id, level, title, tags, date_created, likes
      FROM tasks
      WHERE iscommited = true ${tagsQuery} ${levelFilterQuery}
      ORDER BY ${!level || level === 'undefined' ? `${levelSortQuery},` : ''} ${dateSortQuery}
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    const offset = (page - 1) * onPage;
    const queryParams = [...tagValues, onPage, offset];


    try {
      const tasks = await client.query(queryText, queryParams);

      const quantityQuery = `
        SELECT COUNT(id)
        FROM tasks
        WHERE iscommited = true ${tagsQuery} ${levelFilterQuery}
      `;

      const quantity = await client.query(quantityQuery, tagValues);
      if (tasks.rows.length === 0 && quantity.rows[0].count > 0) {
   
        const queryText = `
      SELECT id, level, title, tags, date_created, likes
      FROM tasks
      WHERE iscommited = true ${tagsQuery} ${levelFilterQuery}
      ORDER BY ${!level || level === 'undefined' ? `${levelSortQuery},` : ''} ${dateSortQuery}
      LIMIT $${paramIndex}
    `;
        const queryParams = [...tagValues, onPage];

        const tasks = await client.query(queryText, queryParams);

        return { tasks: tasks.rows, quantity: parseInt(quantity.rows[0].count, 10), page: 1}
      }

      return { tasks: tasks.rows, quantity: parseInt(quantity.rows[0].count, 10), page: null };
    } catch (error) {
      console.error('Error in allTasks:', error);
      throw error;
    }
  }
  async task(id: number): Promise<TaskWithoutAnswer> {
    const task: ITask = (await client.query(`
        SELECT * FROM tasks
        WHERE id = $1`, [id])).rows[0]

    const { answer, ...data } = task

    return data;
  }

  async tasksByTag(tags: string, id: string) {
    try {
      let tagArray: string[] = []
      const tagArrayFull = tags.split(',').map(tag => `${tag.trim()}`);
      for(const i of tagArrayFull) {
        if(i.split(' ').length > 1) {
          tagArray.push(...i.split(' '))
        }else{
          tagArray.push(i)
        }
      }
      tagArray = tagArray.map(val => `%${val}%`)
      
      let queryText = `SELECT id, title, tags FROM tasks`;
  
      if (tagArray.length > 0) {
        queryText += ` WHERE (${tagArray.map((_, index) => `tags LIKE $${index + 1}`).join(' OR ')})`;
      }
  
      queryText += ` AND id != $${tagArray.length + 1}`;
  
      queryText += ' LIMIT 5';
  
  
      const queryParams = [...tagArray, Number(id)];
  
      const tasks = (await client.query(queryText, queryParams)).rows;
  
      return tasks;
    } catch (e) {
      if (e instanceof Error) {
        throw new HttpException(e.message, 500);
      } else {
        throw new HttpException('Error', 500);
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