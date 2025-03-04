import { ITask } from "../../../interfaces/tasks/task.interface"

export async function fetchTask(id: number): Promise<ITask> {
    const res = await fetch(`http://127.0.0.1:3001/tasks/task/${id}`)
    const data = await res.json()

    return data
} 