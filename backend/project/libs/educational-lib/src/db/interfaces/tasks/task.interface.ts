export type TaskLevels = 'Hard' | "Easy" | "Medium"
export type TaskStatus = 'Watched' | "Solved" | "Tried"

export interface ITask {
    id: number,
    title: string,
    description: string,
    date_created: Date,
    level: TaskLevels,
    created_by: number,
    answer: string,
    iscommited: boolean,
    tags: string
}