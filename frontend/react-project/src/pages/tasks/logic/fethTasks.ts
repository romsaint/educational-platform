import { ITask } from "../interfaces/task.interface"

export async function fetchTasks(page: number, onPage: number): Promise<{ quantity: number, pagination: ITask[] }> {
    const res = await fetch(`http://127.0.0.1:3001/tasks/?page=${page}&onPage=${onPage}`)
    const quantity = await fetch(`http://127.0.0.1:3001/tasks/quantity-tasks`)
    const quantityData = await quantity.json()
    const data = await res.json()

    return {quantity: quantityData.count, pagination: data}
} 