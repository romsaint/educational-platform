import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { client, IUser, IUserWitoutPassword } from '@app/educational-lib'
import { AvatarService } from './avatar/avatar.service';

@Injectable()
export class UsersService implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly avatarService: AvatarService) {}

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
    try{
      let completedTasks: any[] | 0 = (await client.query(`
        select t.id, title, level, tags, likes from users u
        JOIN solved s ON u.id = s.user_id
        JOIN tasks t ON s.task_id = t.id
        WHERE user_id = $1
    `, [user.id])).rows

    completedTasks = completedTasks.length === 0 ? 0 : completedTasks
    
    const watched: any[] | null = (await client.query(`
        select id, title, level, tags, likes from tasks u
        JOIN watched w ON w.user_id = u.created_by
        WHERE user_id = $1
    `, [user.id])).rows


    return {completedTasks, watched}
    }catch(e) {
      if(e instanceof Error) {
        console.log(e.message)
      }
      return { ok: false, msg: 'An error occurred' };
    }
  }

  
  async getAvatar(avatar: string, res) {
    try{
      return this.avatarService.getAvatar(avatar, res)
    }catch(e) {
      return {ok: false, msg: "Error"}
    }
  }
}
