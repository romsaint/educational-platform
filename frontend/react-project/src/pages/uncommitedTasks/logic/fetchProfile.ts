export async function fetchUncommitedTasks() {
    const fet = await fetch('http://localhost:3001/tasks/uncommited-tasks')
    const data = fet.json()
    console.log(data)
    return data 
}