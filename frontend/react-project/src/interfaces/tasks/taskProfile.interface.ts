import { TaskLevels } from "./task.interface";

export interface ITaskProfile {
    id: number,
    title: string,
    date_created: string,
    level: TaskLevels,
    tags: string,
    likes: number
}