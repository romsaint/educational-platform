import { ITask } from "../../tasks/interfaces/task.interface"

export async function fetchTasksByTags(tags: string): Promise<ITask[]> {
    try {
        const res = await fetch(`http://127.0.0.1:3001/tasks/tasksByTag`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Указываем, что в теле запроса - JSON
            },
            body: JSON.stringify({ tags }), // Отправляем JSON-объект
          });
  
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
  
      const data: ITask[] = await res.json(); // Указываем тип возвращаемых данных
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetching tasks by tags failed:", error);
      return []; // Или выбросьте исключение, в зависимости от вашей стратегии обработки ошибок
    }
  }