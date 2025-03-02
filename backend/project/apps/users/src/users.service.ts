import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { client, IUser, IUserWitoutPassword } from '@app/educational-lib'

@Injectable()
export class UsersService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
      await client.connect()
  }
  async onModuleDestroy() {
      await client.end()
  }

  async checkUnique(data: { uniqueName: string }): Promise<{ [key: string]: any }> {
    try{
      if (data?.uniqueName) {
        const isExists: Pick<IUser, 'id'> = (await client.query(`
            SELECT id FROM users
            WHERE unique_id = $1
        `, [data.uniqueName])).rows[0]
  

        if (isExists) {
          return {isExists: true}
        }
  
        return {isExists: false, ok: true}
      }
      
      return { ok: false, msg: "Data please" }
    }catch(e) {
      if(e instanceof Error) {
        console.log(e.message)
      }
      return { ok: false, msg: 'An error occurred' };
    }
  }

  async profile(user: IUserWitoutPassword) {
    const completedTasks = (await client.query(`
        select title, level, tags, likes from users u
        JOIN solved s ON u.id = s.user_id
        JOIN tasks t ON s.task_id = t.id
        WHERE user_id = $1
    `, [user.id])).rows

    completedTasks.length === 0 ? 0 : completedTasks
    
    const countWatched = (await client.query(`
        select COUNT(*) from watched
        where user_id = $1
    `, [user.id])).rows[0].count
  }
}
