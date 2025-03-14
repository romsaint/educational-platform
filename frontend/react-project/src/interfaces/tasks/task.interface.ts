export type TaskLevels = 'Hard' | "Easy" | "Medium"

export interface ITask {
    id: number,
    title: string,
    description: string,
    date_created: string,
    level: TaskLevels,
    created_by: number,
    answer: string,
    iscommited: boolean,
    tags: string,
    likes: number,
    test_cases: string
}