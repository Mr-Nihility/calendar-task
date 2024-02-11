

export interface TaskState {
    tasks: Task[],
    currentDate: string,
    countryCode: Country["countryCode"]
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
    date: string,
    localName: string,
    name: string,
    countryCode: string,
    fixed: boolean,
    global: boolean,
    counties: string[],
    launchYear: 0,
    types: string[]
}

export type CalendarCellData = {
    date: string,
    taskList: Task[],
    holydayList: Holyday[]
}

export type Country = {
    countryCode: string,
    name: string
}