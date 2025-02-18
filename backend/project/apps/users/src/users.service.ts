import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { client, IUser } from '@app/educational-lib'

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
}
