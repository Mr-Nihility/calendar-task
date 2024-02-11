import moment, { Moment } from "moment";
import { CalendarCellData, Holyday } from "../redux/types/task.types";
export const DEFAULT_DATE_FORMAT = "DD-MM-YYYY";
export const getCalendarCellsByDate = (date: Moment): CalendarCellData[] => {

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
            date: day.clone().format("DD-MM-YYYY"),
            taskList: [],
            holydayList: []
        });
        day.add(1, 'day');
    }
    return calendar;
}
export function buildWeekGrid(format: string): string[] {
    const weekDays: string[] = [];
    const currentDay = moment().startOf('isoWeek');
    for (let i = 0; i < 7; i++) {
        weekDays.push(currentDay.format(format));
        currentDay.add(1, 'day');
    }

    return weekDays;
}
export function nextMonth(date: moment.Moment): string {
    return date.clone().add(1, 'month').format(DEFAULT_DATE_FORMAT);
}
export function prevMonth(date: moment.Moment): string {
    return date.clone().subtract(1, 'month').format(DEFAULT_DATE_FORMAT);
}
export function nextWeek(date: moment.Moment): string {
    return date.clone().add(1, 'week').format(DEFAULT_DATE_FORMAT);
}
export function prevWeek(date: moment.Moment): string {
    return date.clone().subtract(1, 'week').format(DEFAULT_DATE_FORMAT);
}
export function performHolidays(holydays: Holyday[]): Holyday[] {
    return holydays.map(holyday => {
        const date = moment(holyday.date, "YYYY-MM-DD").format(DEFAULT_DATE_FORMAT)
        return { ...holyday, date };
    })
}