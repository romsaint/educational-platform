import { client } from "@app/educational-lib";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WatchedService {
    async setWatched(task: { taskId: number, userId: number }) {
        try {
        
            const watched =(await client.query(`
                select user_id From watched
                where user_id = $1 AND task_id = $2
            `, [task.userId, task.taskId])).rows[0]
                console.log(task)
            if (!watched) {
                await client.query(`
                    INSERT INTO watched (user_id, task_id)
                    values($1, $2)
                `, [task.userId, task.taskId])

                return { ok: true }
            }

        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message)
                return { msg: e.message, ok: false }
            } else {
                return { msg: 'Error', ok: false }
            }
        }
    }
}