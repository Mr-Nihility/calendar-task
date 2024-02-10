import moment, { Moment } from "moment";
import { CalendarCellData } from "../redux/types/task.types";

export const getCalendarCellsByDate = (date: Moment): CalendarCellData[] => {

    moment.updateLocale('en', {week: {dow: 1, doy: 7}});

    const startDay = moment(date)
        .startOf('month')
        .startOf('week');

    const endDay = moment(date)
        .endOf('month')
        .endOf('week');

    const calendar: CalendarCellData[] = [];
    const day = startDay.clone();
    console.log({endDay, day, startDay})
    while (!day.isAfter(endDay)) {
        calendar.push({
            date: day.clone().format("DD-MM-YYYY"),
            taskList: [],
            holidays: []
        });
        day.add(1, 'day');
    }
    return calendar;
}

export  function buildCalendarGrid(startDay: moment.Moment, numWeeks: number): moment.Moment[] {
    moment.updateLocale('en', {week: {dow: 1, doy: 7}});
    const calendarGrid: moment.Moment[] = [];
    let currentDay = startDay.clone().startOf('week'); // Почати з першого дня тижня, що містить задану дату
    const endDay = startDay.clone().add(numWeeks, 'weeks').endOf('week'); // Закінчити на останньому дні останнього тижня

    while (currentDay.isSameOrBefore(endDay)) {
        calendarGrid.push(currentDay.clone()); // Додати копію поточної дати до масиву
        currentDay.add(1, 'day'); // Перехід до наступного дня
    }

    return calendarGrid;
}