import { createSelector } from "@reduxjs/toolkit";
import { Task, TaskState } from "../types/task.types";
const selectTasks = (state: TaskState) => state.tasks;

const selectDate = (state: TaskState) => state.currentDate;
export const getAllTask = createSelector(
    selectTasks,
    (tasks: Task[]) => tasks
);

export const getCurrentDate = createSelector(
    selectDate,
    (date: string) => date
)