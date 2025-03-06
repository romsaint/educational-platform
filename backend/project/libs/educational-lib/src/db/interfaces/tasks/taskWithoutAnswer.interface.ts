import { ITask } from "./task.interface";

export interface ITaskWithoutAnswer extends Omit<ITask, 'answer'> {
    
}