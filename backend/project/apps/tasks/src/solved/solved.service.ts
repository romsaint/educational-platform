import { client, IUserWitoutPassword } from "@app/educational-lib";
import { ITask } from "@app/educational-lib/db/interfaces/tasks/task.interface";
import { Injectable } from "@nestjs/common";
import { solveTestCase } from "./shared/solveTestCase";

@Injectable()
export class SolvedService {
    async solveTestCases(data: { testCases: string, taskId: number, user: IUserWitoutPassword }) {
        const user = (await client.query(`
            SELECT username FROM users
            WHERE role = $1 AND id = $2
        `, [data.user.role, data.user.id])).rows[0]
        if (!user) {
            return { msg: "Access denied!"}
        }

        const task: ITask = (await client.query(`
            SELECT * FROM tasks
            WHERE id = $1  
        `, [data.taskId])).rows[0]

        if (task) {
            const res = solveTestCase(task.answer, task.test_cases)
            console.log(res)
            return { res }
        }

        return { msgL: 'Task no found'}
    }
}