import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { client, IUser, IUserWitoutPassword } from '@app/educational-lib'
import { AvatarService } from './avatar/avatar.service';

@Injectable()
export class UsersService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly avatarService: AvatarService) { }

  async onModuleInit() {
    await client.connect()
  }
  async onModuleDestroy() {
    await client.end()
  }

  async checkUnique(data: { uniqueName: string }): Promise<{ [key: string]: any }> {
    try {
      if (data?.uniqueName) {
        const isExists: Pick<IUser, 'id'> = (await client.query(`
            SELECT id FROM users
            WHERE unique_id = $1
        `, [data.uniqueName])).rows[0]


        if (isExists) {
          return { isExists: true }
        }

        return { isExists: false, ok: true }
      }

      return { ok: false, msg: "Data please" }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
      return { ok: false, msg: 'An error occurred' };
    }
  }

  async profile(user: IUserWitoutPassword) {
    try {
      let completedTasks: any[] | 0 = (await client.query(`
        select t.id, title, level, tags, likes from users u
        JOIN solved s ON u.id = s.user_id
        JOIN tasks t ON s.task_id = t.id
        WHERE user_id = $1
    `, [user.id])).rows

      completedTasks = completedTasks.length === 0 ? 0 : completedTasks

      const watched: any[] | null = (await client.query(`
        select DISTINCT ON(id) id, title, level, tags, likes from tasks t
      JOIN watched w ON w.task_id = t.id
      WHERE user_id = $1
    `, [user.id])).rows

      const countByLevel = (await client.query(`
        select count(*), level from solved s
        join tasks t on s.task_id = t.id
        where s.user_id = $1
        group by level
        order by level
      `, [user.id])).rows

        let monthTsks = (await client.query(`
          select  DATE(date_created) AS created_day, count(*) from solved s
          join tasks t on s.task_id = t.id
          WHERE date_created BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE + interval '1 days'
          GROUP BY DATE(date_created)
          ORDER BY created_day;
        `)).rows
        monthTsks = monthTsks.map(val => {return {created_day: new Date(val.created_day).toLocaleDateString(), count: val.count}})
          console.log(monthTsks)
      return { completedTasks, watched, countByLevel, monthTsks}
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message)
      }
      return { ok: false, msg: 'An error occurred' };
    }
  }


  async getAvatar(avatar: string, res) {
    try {
      return this.avatarService.getAvatar(avatar, res)
    } catch (e) {
      return { ok: false, msg: "Error" }
    }
  }
}
