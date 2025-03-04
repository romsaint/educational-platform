export async function setWatched(userId: number, id: number) {
    await fetch('http://localhost:3001/tasks/set-watched', {
        method: "POST",
        body: JSON.stringify({userId, taskId: id}),
        headers: {
            'Content-Type': "application/json"
        }
    })
}