
export async function fetchTags(): Promise<{btrim: string}[]> {
    const res = await fetch(`http://127.0.0.1:3001/tasks/all-tags`)
    const data = await res.json()

    return data
} 