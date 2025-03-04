import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { client } from '@app/educational-lib';
import { ITask } from '@app/educational-lib/db/interfaces/tasks/task.interface';
import { TaskWithoutAnswer } from '@app/educational-lib';

@Injectable()
export class TasksService implements OnModuleInit, OnModuleDestroy {
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
    level: 'Easy' | 'Medium' | 'Hard' | 'undefined' | 'all'
  ) {

    if (page <= 0 || onPage <= 0) {
      return { tasks: [], quantity: 0 };
    }

    let levelSortQuery: string = ''


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
    if (level && level !== 'undefined' && level !== 'all') {
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

        return { tasks: tasks.rows, quantity: parseInt(quantity.rows[0].count, 10), page: 1 }
      }

      return { tasks: tasks.rows, quantity: parseInt(quantity.rows[0].count, 10), page: null };
    } catch (e) {
      if (e instanceof Error) {
        return { msg: e.message, ok: false }
      } else {
        return { msg: 'Error', ok: false }
      }
    }
  }
  async task(id: number): Promise<TaskWithoutAnswer | { [key: string]: any }> {
    try {
      const task: ITask = (await client.query(`
        SELECT * FROM tasks
        WHERE id = $1 and iscommited = true`, [id])).rows[0]

      const { answer, ...data } = task

      return data;
    } catch (e) {
      if (e instanceof Error) {
        return { msg: e.message, ok: false }
      } else {
        return { msg: 'Error', ok: false }
      }
    }
  }

  async tasksByTag(tags: string, id: string) {
    try {
      let tagArray: string[] = []
      const tagArrayFull = tags.split(',').map(tag => `${tag.trim()}`);
      for (const i of tagArrayFull) {
        if (i.split(' ').length > 1) {
          tagArray.push(...i.split(' '))
        } else {
          tagArray.push(i)
        }
      }
      tagArray = tagArray.map(val => `%${val}%`)

      let queryText = `SELECT id, title, tags FROM tasks`;

      if (tagArray.length > 0) {
        queryText += ` WHERE (${tagArray.map((_, index) => `tags LIKE $${index + 1}`).join(' OR ')})`;
      }
      queryText += ' AND iscommited = true'
      queryText += ` AND id != $${tagArray.length + 1}`;

      queryText += ' LIMIT 5';


      const queryParams = [...tagArray, Number(id)];

      const tasks = (await client.query(queryText, queryParams)).rows;

      return tasks;
    } catch (e) {
      if (e instanceof Error) {
        return { msg: e.message, ok: false }
      } else {
        return { msg: 'Error', ok: false }
      }
    }
  }

  async allTags(): Promise<string[] | { [key: string]: any }> {
    try {
      const tags = (await client.query(`
        WITH split_tags AS (
            SELECT UNNEST(STRING_TO_ARRAY(tags, ',')) AS tag
            FROM tasks
            where iscommited = true
        ) 
        select distinct TRIM(tag) from split_tags
    `)).rows

      return tags

    } catch (e) {
      if (e instanceof Error) {
        return { msg: e.message, ok: false }
      } else {
        return { msg: 'Error', ok: false }
      }
    }
  }

  async createTask(task: { [key: string]: any }) {
    try {
      if (task.user.role === 'USER') {
        return { ok: false, msg: "Access denied" }
      }
      await client.query(`
          INSERT INTO tasks (title, description, level, created_by, iscommited, tags, test_cases, answer)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, [task.title, task.description, task.level.toUpperCase(), task.user.id, false, task.tags, task.testCases, task.answer])

      return { ok: true, msg: "Created" }
    } catch (e) {
      if (e instanceof Error) {
        return { msg: e.message, ok: false }
      } else {
        return { msg: 'Error', ok: false }
      }
    }
  }

  async uncommitedTasks() {
    try {
      const tasks = (await client.query(`
        SELECT id, level, title, tags, date_created, likes
        FROM tasks
        WHERE iscommited = false
      `)).rows
      return tasks
    } catch (e) {
      if (e instanceof Error) {
        return { msg: e.message, ok: false }
      } else {
        return { msg: 'Error', ok: false }
      }
    }
  }


  async commitTask(task: { taskId: number, role: string, id: number }) {
    try {
      const user = (await client.query(`
          SELECT username FROM users
          WHERE role = $1 AND id = $2
      `, [task.role, task.id])).rows[0]
      if (!user) {
        return { msg: "Access denied!" }
      }

      if (task.role !== 'USER') {
        await client.query(`
          UPDATE tasks
          SET iscommited = true
          WHERE id = $1
      `, [task.taskId])
      }
    } catch (e) {
      if (e instanceof Error) {
        return { msg: e.message, ok: false }
      } else {
        return { msg: 'Error', ok: false }
      }
    }
  }
}