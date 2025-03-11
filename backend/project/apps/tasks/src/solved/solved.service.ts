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
            return { msg: "Access denied!" }
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

        return { msg: 'Task not found' }
    }


    async runCode(code: { solveFn: string, testCases: string, taskId: number, userId: number }) {
        try {
          // Получаем задачу из базы
          const task: ITask = (await client.query(`
            SELECT * FROM tasks
            WHERE id = $1  
          `, [code.taskId])).rows[0];
      
          if (!task) {
            return { msg: 'Task not found' };
          }
      
          // Получаем пользователя
          const user = (await client.query(`
            SELECT * FROM users
            WHERE id = $1
          `, [code.userId])).rows[0];
      
          if (!user) {
            return { msg: "Access denied!" };
          }
      
          // Преобразуем строки в функции-решения
          const solve = eval('(' + code.solveFn + ')');
          const answer = eval('(' + task.answer + ')');
      
          // Тесткейсы приходят в виде JSON-строки, например: '["[1,2,3]", "[2,3,4]", "[23,3]"]'
          const tests: string[] = JSON.parse(code.testCases);
      
          // Вспомогательная функция для приведения тесткейса к нужному типу
          function parseTestCase(testCase: string): any {
            try {
              // Если строка является валидным JSON, парсим её
              return JSON.parse(testCase);
            } catch (e) {
              // Если не получилось, пробуем преобразовать в число, если это возможно
              if (!isNaN(Number(testCase))) {
                return Number(testCase);
              }
              // Иначе возвращаем строку как есть
              return testCase;
            }
          }
          console.log(parseTestCase(tests[0]))
          // Запускаем тесты
          for (let i = 0; i < tests.length; i++) {
            const input = parseTestCase(tests[i]);
            const expected = answer(input);
            const userResult = solve(input);
            if (userResult !== expected) {
              return { msg: "Wrong code", testCase: input, answer: expected, wrongAnswer: userResult, ok: false };
            }
          }
          const isSolved = (await client.query(`
            SELECT user_id from solved
            WHERE user_id = $1 AND task_id = $2
          `, [code.userId, code.taskId])).rows[0]

          if(!isSolved) {
            await client.query(`
              INSERT into solved (user_id, task_id)
              values ($1, $2)
            `, [code.userId, code.taskId])
            return { msg: "Success!", ok: true };
          }else{
            return { msg: "You've already solved this problem", ok: true };
          }
      
      
        } catch (e) {
          console.log(e);
          if (e instanceof Error) {
            return { msg: e.message };
          }
          return { msg: 'Error' };
        }
      }
      
}