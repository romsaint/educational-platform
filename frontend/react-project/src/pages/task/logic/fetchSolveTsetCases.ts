import { IUserWitoutPassword } from "../../../interfaces/users/userWithoutPassword.interface"

export async function fetchTestCases(testCases: string, taskId: number, user: IUserWitoutPassword) {
    const res = await fetch(`http://127.0.0.1:3001/tasks/solve-test-cases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Указываем, что в теле запроса - JSON
        },
        body: JSON.stringify({ testCases, taskId, user }), // Отправляем JSON-объект
    })
    const data = await res.json()
    console.log(data)
    return data
} 
