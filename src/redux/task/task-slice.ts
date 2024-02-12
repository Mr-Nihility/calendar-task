import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { nanoid } from 'nanoid'
import { Country, LabelTypes, Task, TaskPayload, TaskState } from '../types/task.types'

const initialState: TaskState = {
    tasks: [
        {
            id: nanoid(),
            name: "Learn JS",
            labels: [LabelTypes.Green],
            date: "09-02-2024",
            order: 1
        },
        {
            id: nanoid(),
            name: "Learn React",
            labels: [LabelTypes.Blue],
            date: "09-02-2024",
            order: 2
        },
        {
            id: nanoid(),
            name: "Learn Angular",
            labels: [LabelTypes.Red],
            date: "09-02-2024",
            order: 3
        }
    ],
    currentDate: moment().format("DD-MM-YYYY"),
    countryCode: "UA",
    calendarType: "month"
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>): void => {
            state.tasks = [...state.tasks, action.payload]
        },
        mergeTasksFromFile: (state, action: PayloadAction<Task[]>): void => {
            const uniqTasks = action.payload.filter(tsk => state.tasks.every(stateTask => stateTask.id !== tsk.id));
            console.log("🚀 >>> uniqTasks:", uniqTasks, action.payload)
            state.tasks = [...state.tasks, ...uniqTasks]
        },
        updateTask: (state, action: PayloadAction<TaskPayload>) => {
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    return { ...task, ...action.payload };
                }
                return task;
            });
        },
        deleteTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks
                .filter(task => task.id !== action.payload.id);
        },
        setDate: (state, action) => {
            state.currentDate = action.payload;
        },
        setCountryCode: (state, action: PayloadAction<Country["countryCode"]>) => {
            state.countryCode = action.payload;
        },
        setCalendarType: (state, action: PayloadAction<TaskState['calendarType']>) => {
            state.calendarType = action.payload;
        }
    },
})
export const { addTask, updateTask, deleteTask, setDate, setCountryCode, setCalendarType, mergeTasksFromFile: mergeFromFile } = taskSlice.actions

export default taskSlice.reducer