import { client } from "@app/educational-lib";
import { ITaskWithoutAnswer } from "@app/educational-lib/db/interfaces/tasks/taskWithoutAnswer.interface";

export async function taskTestCases(taskWithoutAnswer: ITaskWithoutAnswer) {
    try {
        const task = (await client.query(`
            SELECT * FROM tasks
            where id = $1      
          `, [taskWithoutAnswer.id])).rows[0]

        if (!task) {
            return { msg: 'Task not found' }
        }

        let solutionFunc: ((arr: any) => any) | null = null;
        if (task?.answer) {
            try {
                solutionFunc = eval('(' + task.answer + ')');
            } catch (error) {
                return { msg: "Error during parsing" }
            }

        }
        let testCasesRes: any[] = []
        if (task.test_cases.includes("[")) {
            let k = 0;
            let l = 0;
            let res: string[] = [];
            while (task.test_cases[k]) {
                if (task.test_cases[k] === "]") {
                    res.push(task.test_cases.slice(l, k + 1));
                    l = k + 2;
                }
                k++;
            }
            testCasesRes = res
        } else {
            testCasesRes = task.test_cases.split(",")
        }

        let solution
        if(solutionFunc) {
            solution = testCasesRes.map(val => solutionFunc(JSON.parse(val)))
        }

        return { testCasesRes, solution }
    } catch (e) {
        return { msg: "Error" }
    }
}