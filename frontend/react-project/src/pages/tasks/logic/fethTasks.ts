import { ITask } from "../../../interfaces/task.interface"

export async function fetchTasks(page: number, onPage: number, lvlSorted: string, tags: string): Promise<{ quantity: number, pagination: ITask[] }> {
    const res = await fetch(`http://127.0.0.1:3001/tasks/?page=${page}&onPage=${onPage}&lvlSorted=${lvlSorted}&tags=${tags}`)
    const data = await res.json()
  
    return {quantity: data.quantity, pagination: data.tasks}
} 