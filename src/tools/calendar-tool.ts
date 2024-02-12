import moment, { Moment } from "moment";
import { CalendarCellData, Holyday, TaskState } from "../redux/types/task.types";
export const DEFAULT_DATE_FORMAT = "DD-MM-YYYY";
export const buildGrid = (date: Moment, type: TaskState["calendarType"]): CalendarCellData[] => {
    switch (type) {
        case "week":
            return buildWeekGrid(date);
        case "month":
            return buildMonthGrid(date);

        default:
            throw new Error("Calendar type unknown")
    }
}
export const buildWeekGrid = (date: Moment): CalendarCellData[] => {

    moment.updateLocale('en', { week: { dow: 1, doy: 7 } });

    const startDay = moment(date)
        .startOf('week');

    const endDay = moment(date)
        .endOf('week');

    const calendar: CalendarCellData[] = [];
    const day = startDay.clone();
    console.log({ endDay, day, startDay })
    while (!day.isAfter(endDay)) {
        calendar.push({
            date: day.clone().format(DEFAULT_DATE_FORMAT),
        });
        day.add(1, 'day');
    }
    return calendar;
}


export const buildMonthGrid = (date: Moment): CalendarCellData[] => {

    moment.updateLocale('en', { week: { dow: 1, doy: 7 } });

    const startDay = moment(date)
        .startOf('month')
        .startOf('week');

    const endDay = moment(date)
        .endOf('month')
        .endOf('week');

    const calendar: CalendarCellData[] = [];
    const day = startDay.clone();
    console.log({ endDay, day, startDay })
    while (!day.isAfter(endDay)) {
        calendar.push({
            date: day.clone().format(DEFAULT_DATE_FORMAT),
        });
        day.add(1, 'day');
    }
    return calendar;
}

export function buildWeekGridHeader(format: string): string[] {
    const weekDays: string[] = [];
    const currentDay = moment().startOf('isoWeek');
    for (let i = 0; i < 7; i++) {
        weekDays.push(currentDay.format(format));
        currentDay.add(1, 'day');
    }

    return weekDays;
}
export function nextDate(date: moment.Moment, type: TaskState["calendarType"]): string {
    return date.clone().add(1, type).format(DEFAULT_DATE_FORMAT);
}
export function prevDate(date: moment.Moment, type: TaskState["calendarType"]): string {
    return date.clone().subtract(1, type).format(DEFAULT_DATE_FORMAT);
}

export function performHolidays(holydays: Holyday[]): Holyday[] {
    return holydays.map(holyday => {
        const date = moment(holyday.date, "YYYY-MM-DD").format(DEFAULT_DATE_FORMAT)
        return { ...holyday, date };
    })
}