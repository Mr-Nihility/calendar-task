import moment from "moment";


export interface TaskState {
    tasks: Task[],
    currentDate: string
}

export enum LabelTypes {
    Green = "green",
    Blue = "blue",
    Red = "red"
}

export type Task = {
    id: string,
    date: string,
    labels: LabelTypes[],
    name: string,
    order: number,
}


export type TaskPayload = {
    id: string,
    date: string,
    labels?: LabelTypes[],
    name?: string,
    order?: number
}
export type Holyday = {
    date: string
}

export type CalendarCellData = {
    date: string,
    taskList: Task[],
    holidays: Holyday[]
}