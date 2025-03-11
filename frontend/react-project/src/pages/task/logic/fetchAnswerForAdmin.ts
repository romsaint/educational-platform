import { IUserWitoutPassword } from "../../../interfaces/users/userWithoutPassword.interface";

export async function fetchAnswerForAdmin(user: IUserWitoutPassword, taskId: number) {
    try{
        const res = await fetch('http://127.0.0.1:3001/tasks/get-answer', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ user, taskId })
        })
        
        return (await res.json()).answer
    }catch(e) {
        return {msg: 'Error'}
    }
}