import { ITask } from "./task.interface";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type TaskWithoutAnswer = Omit<ITask, "answer">;