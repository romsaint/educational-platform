export async function fetchRunCode(solveFn: string, testCases: string, taskId: number, userId: number) {
    console.log(solveFn, testCases, taskId)
    try{
        const data = await fetch('http://127.0.0.1:3001/tasks/run-code', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({solveFn, testCases, taskId, userId})
        })
    
        const res = data.json()
    
        return res
    }catch(e) {
        return {msg: 'Error'}
    }
}