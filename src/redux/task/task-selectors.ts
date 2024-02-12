import { createSelector } from "@reduxjs/toolkit";
import { Task, TaskState } from "../types/task.types";
const selectTasks = (state: TaskState) => state.tasks;

const selectDate = (state: TaskState) => state.currentDate;

const selectCountryCode = (state: TaskState) => state.countryCode;

const selectCalendarType = (state: TaskState) => state.calendarType;

export const getAllTask = createSelector(
    selectTasks,
    (tasks: Task[]) => tasks
);

export const getCurrentDate = createSelector(
    selectDate,
    (date: string) => date
)

export const getLabelList = createSelector(
    selectTasks,
    (tasks: Task[]) => [...new Set(tasks.map(t => t.labels).flat())]
)

export const getCountryCode = createSelector(
    selectCountryCode,
    (code) => code
)

export const getCalendarType = createSelector(
    selectCalendarType,
    (type) => type
)