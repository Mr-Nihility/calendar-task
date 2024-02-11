import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { LabelTypes, Task, TaskPayload, TaskState } from '../types/task.types'


const initialState: TaskState = {
    tasks: [
        {
            id: "1",
            name: "Learn JS",
            labels: [LabelTypes.Green],
            date: "09-02-2024",
            order: 1
        },
        {
            id: "2",
            name: "Learn React",
            labels: [LabelTypes.Blue],
            date: "09-02-2024",
            order: 2
        },
        {
            id: "3",
            name: "Learn Angular",
            labels: [LabelTypes.Red],
            date: "09-02-2024",
            order: 3
        }
    ],
    currentDate: moment().format("DD-MM-YYYY"),
    countryCode: "UA"
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>): void => {
            state.tasks = [...state.tasks, action.payload]
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
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
        },
        setDate: (state, action) => {
            state.currentDate = action.payload;
        },
        setCountryCode(state, action) {
            state.countryCode = action.payload
        }
    },
})
export const { addTask, updateTask, deleteTask, setDate, setCountryCode } = taskSlice.actions

export default taskSlice.reducer