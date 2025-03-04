import { ITask } from "../../../interfaces/tasks/task.interface"

export async function fetchTasks(page: number, onPage: number, lvlSorted: string, tags: string, date: string, level: string): Promise<{ quantity: number, pagination: ITask[], page: 1 | null }> {
    const res = await fetch(`http://127.0.0.1:3001/tasks/?page=${page}&onPage=${onPage}&lvlSorted=${lvlSorted}&tags=${tags}&level=${level}&date=${date}`)
    const data = await res.json()
  
    return {quantity: data.quantity, pagination: data.tasks, page: data.page}
} 