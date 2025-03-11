import { client } from "@app/educational-lib";
import { ITask } from "@app/educational-lib/db/interfaces/tasks/task.interface";
import { ITaskWithoutAnswer } from "@app/educational-lib/db/interfaces/tasks/taskWithoutAnswer.interface";

export async function taskTestCases(taskWithoutAnswer: ITaskWithoutAnswer) {
    try {
        const { rows } = await client.query(`
            SELECT * FROM tasks
            WHERE id = $1      
            `, [taskWithoutAnswer.id]);
        const task: ITask | undefined = rows[0];

        if (!task) {
            return null
        }

        let solutionFunc = eval(`(${task.answer.trim()})`);
        const arr = task.test_cases.split(';SPLIT;')

        function handlerVal(str: string) {
            try {
                return eval('(' + str + ')')
            } catch (e) {

                throw new Error('Error')
            }
        }

        const testsRes = arr.map(val => handlerVal(val))
        const res = testsRes.map(val => solutionFunc(val))
       
        return {res, testsRes}
    } catch (e) {

        return null
    }
}