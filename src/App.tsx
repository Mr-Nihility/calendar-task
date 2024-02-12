import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { usePublicHolidays } from './Api/Api-hook/useDateApi';
import './App.css';
import Calendar from './components/Calendar/Calendar';
import Header from "./components/Header/Header";
import { getAllTask, getCalendarType, getCountryCode, getCurrentDate } from './redux/task/task-selectors';
import { CalendarCellData, LabelTypes } from './redux/types/task.types';
import { DEFAULT_DATE_FORMAT, buildGrid } from './tools/calendar-tool';

function App() {
    const [calendarCells, setCalendarCells] = useState<CalendarCellData[]>([])
    const [searchInput, setSearchInput] = useState("")
    const [searchLabel, setSearchLabel] = useState<LabelTypes | string | null>(null)
    const tasklist = useSelector(getAllTask);
    const currentDate = useSelector(getCurrentDate);
    const currentType = useSelector(getCalendarType)
    const currentCountryCode = useSelector(getCountryCode);
    const publicHolidaysQuery = usePublicHolidays(moment(currentDate).format("YYYY"), currentCountryCode);

    useEffect(() => {
        publicHolidaysQuery.refetchPublicHolydays()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const grid = buildGrid(moment(currentDate, DEFAULT_DATE_FORMAT), currentType)
        setCalendarCells(grid)
    }, [currentDate, currentType])

    const filteredTasklist = useCallback((filterString: string, filterLabel: LabelTypes | string | null) => {
        return tasklist.filter(task => {
            if (filterLabel) {
                return task.name.toLowerCase().includes(filterString.toLowerCase()) && task.labels.includes(filterLabel as LabelTypes);
            }
            return task.name.toLowerCase().includes(filterString.toLowerCase());
        })
    }, [tasklist]);

    const onSearchInputChange = (value: string) => {
        setSearchInput(value)
    }

    const onSearchLabelChange = (label: LabelTypes | string) => {
        setSearchLabel(label)
    }

    return (
        <>
            <div style={{
                width: "100%",
                height: "100%"
            }}>
                <Header
                    onSearchInputChange={onSearchInputChange}
                    onSearchLabelChange={onSearchLabelChange}
                    searchInput={searchInput}
                    searchLabel={searchLabel}
                />
                <Calendar
                    holydays={publicHolidaysQuery.holydaysList}
                    taskList={filteredTasklist(searchInput, searchLabel)}
                    calendarCells={calendarCells}
                />
            </div>
        </>

    )
}

export default App;
