// import React, { useCallback, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllTask, getCurrentDate } from '../../redux/task/task-selectors';
// import { addTask } from '../../redux/task/task-slice';
// import { CalendarCellData, Task } from '../../redux/types/task.types';
// import { getCalendarCellsByDate } from '../../tools/calendar-tool';
// import CalendarCell from '../CalendarCell/CalendarCell';
// import { CalendarBox } from './styled/CalendarBox';

import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTask, getCurrentDate } from "../../redux/task/task-selectors.ts";
import { addTask, updateTask } from "../../redux/task/task-slice.ts";
import { CalendarCellData, Task } from "../../redux/types/task.types.ts";
import { getCalendarCellsByDate } from "../../tools/calendar-tool.ts";
import CalendarCell from "../CalendarCell/CalendarCell.tsx";
import { CalendarBox } from "./styled/CalendarBox";

export default function Calendar() {
    const dispatch = useDispatch();
    const tasks = useSelector(getAllTask);
    const selectedDate = useSelector(getCurrentDate);
    const [currentCellDate, setCurrentCellDate] = useState<null | Task["date"]>(null);
    const [draggingTask, setDraggingTask] = useState<null | Task>(null);
    const [dragOverTask, setDragOverTask] = useState<null | Task>(null)
    const [calendarCells, setCalendarCells] = useState<CalendarCellData[]>([])


    useEffect(() => {
        const grid: CalendarCellData[] = getCalendarCellsByDate(moment(selectedDate, "DD-MM-YYYY")).map(cell => {
            cell.taskList = tasks.filter(task => task.date === cell.date)
            return cell;
        })

        setCalendarCells(grid)
    }, [tasks, selectedDate])

    const onDragStartHandler = (task: Task) => {
        console.log('onDragStartHandler', task);
        setDraggingTask(task);
    }
    const onDragEndHandler = () => {
        console.log('onDragEndHandler');
        if (currentCellDate && draggingTask) {
            if (dragOverTask) {
                const dragOverOrder = dragOverTask.order;
                const draggingTaskOrder = draggingTask.order;
                dispatch(updateTask({
                    ...dragOverTask,
                    order: draggingTaskOrder,
                    date: currentCellDate
                }))
                dispatch(updateTask({
                    ...draggingTask,
                    order: dragOverOrder,
                    date: currentCellDate
                }))
            } else {
                dispatch(updateTask({
                    id: draggingTask.id,
                    date: currentCellDate
                }))
            }
        }
    }
    const onDragOverHandler = (task: Task) => {
        console.log('onDragOverHandler', task);
        setDragOverTask(task)
    }
    const onDragLeaveHandler = (task: Task) => {
        console.log(task);
        setDragOverTask(null)
    }
    // const onDropHandler = (task: Task) => {
    //     if (currentCellDate && draggingTask) {
    //         if (dragOverTask) {
    //             console.log("dragOverTask", dragOverTask);
    //             const dragOverOrder = dragOverTask.order;
    //             const draggingTaskOrder = draggingTask.order;
    //             dragOverTask.order = draggingTaskOrder;
    //             draggingTask.order = dragOverOrder;
    //             dispatch(updateTask({
    //                 ...dragOverTask
    //             }))
    //             dispatch(updateTask({
    //                 ...draggingTask
    //             }))
    //         } else {
    //             dispatch(updateTask({
    //                 id: draggingTask.id,
    //                 date: currentCellDate
    //             }))
    //         }
    //     }
    // }

    // const dragHandler = (id: Task["id"], event: React.DragEvent<HTMLDivElement>) => {
    //     console.log(id, event);
    //     setDraggingTaskId(id);
    // }

    // const onDropHandler = () => {

    // }

    const onDragOverCalendarCell = (date: Task["date"]) => setCurrentCellDate(date)
    const onCellClickHandler = (date: Task["date"]) => {
        const cell = calendarCells.find(cell => cell.date === date);
        const order = cell ? Math.max(...cell.taskList.map(task => task.order)) + 1 : 1;

        const id = moment.now() + "";
        dispatch(addTask({
            id,
            name: "",
            labels: [],
            date,
            order
        }))
    }

    return (
        <CalendarBox>
            {!!calendarCells?.length && calendarCells.map((item, i) => {
                return (
                    <CalendarCell
                        key={i}
                        date={item.date}
                        taskList={item.taskList}
                        // onDropHandler={onDropHandler}
                        onDragOverHandler={onDragOverHandler}
                        onDragStartHandler={onDragStartHandler}
                        onDragLeaveHandler={onDragLeaveHandler}
                        onDragEndHandler={onDragEndHandler}
                        onDragOverCellHandler={onDragOverCalendarCell}
                        onCellClickHandler={onCellClickHandler}
                        isToday={moment().format('L') === moment(item.date).format('L')}
                    />
                );
            })}
        </CalendarBox>

    );
}
