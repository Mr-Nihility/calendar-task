import moment from "moment";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../redux/task/task-slice.ts";
import { CalendarCellData, Holyday, LabelTypes, Task } from "../../redux/types/task.types.ts";
import { buildWeekGridHeader } from "../../tools/calendar-tool.ts";
import CalendarCell from "../CalendarCell/CalendarCell.tsx";
import LabelSelector from "../Control/LabelSelector/LabelSelector.tsx";
import { CalendarBox } from "./styled/CalendarBox";
import { CalendarHeader } from "./styled/CalendarHeader.ts";

type CalendarProps = {
    calendarCells: CalendarCellData[],
    taskList: Task[],
    holydays: Holyday[]
}
export default function Calendar({ calendarCells, taskList, holydays }: CalendarProps) {
    const dispatch = useDispatch();
    const [currentCellDate, setCurrentCellDate] = useState<null | Task["date"]>(null);
    const [draggingTask, setDraggingTask] = useState<null | Task>(null);
    const [dragOverTask, setDragOverTask] = useState<null | Task>(null)
    const [activeTaskEditing, setActiveTaskEditing] = useState<{ task: Task, rect: DOMRect } | null>(null)
    const allLabelList = Object.values(LabelTypes);
    const onDragStartHandler = (task: Task) => {
        setDraggingTask(task);
    }
    const onEditLabelClickHandler = (task: Task, element: HTMLDivElement | null) => {
        console.dir(element);
        if (!element) return;
        setActiveTaskEditing(
            {
                task: task,
                rect: element.getBoundingClientRect()
            }
        )
    }


    const onDragEndHandler = () => {

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


    const onDragOverCalendarCell = (date: Task["date"]) => setCurrentCellDate(date)
    const onCellClickHandler = (date: Task["date"]) => {
        const cell = calendarCells.find(cell => cell.date === date);
        let order
        if (cell && taskList.length) {
            order = Math.max(...taskList.filter(task => task.date === date).map(task => task.order)) + 1
        } else {
            order = 1;
        }

        const id = nanoid();
        dispatch(addTask({
            id,
            name: "",
            labels: [],
            date,
            order
        }))
    }
    const onLabelChange = (label: LabelTypes) => {
        if (activeTaskEditing?.task) {
            const index = activeTaskEditing.task.labels.indexOf(label);
            let newLabels = []
            if (index === -1) {
                newLabels = [...activeTaskEditing.task.labels, label];
            } else {
                newLabels = [...activeTaskEditing.task.labels.filter((_, i) => i !== index)]
            }
            dispatch(updateTask({
                id: activeTaskEditing.task.id,
                labels: newLabels
            }))
            setActiveTaskEditing({
                task: { ...activeTaskEditing.task, labels: newLabels },
                rect: activeTaskEditing.rect
            })
        }
    }
    const onLabelSelectorClose = () => {
        setActiveTaskEditing(null)
    }

    return (
        <>
            <CalendarHeader>
                {buildWeekGridHeader("ddd").map((day, i) => {
                    return (
                        <div
                            key={i}
                        >
                            {day}
                        </div>)
                })}
            </CalendarHeader>


            <CalendarBox>
                {activeTaskEditing && <LabelSelector allLabels={allLabelList} currentItemLabel={activeTaskEditing.task.labels} rect={activeTaskEditing.rect} onClickHandler={onLabelChange} onClose={onLabelSelectorClose} />}
                {!!calendarCells?.length && calendarCells.map((item, i) => {
                    return (
                        <CalendarCell
                            onEditLabelClickHandler={onEditLabelClickHandler}
                            key={i}
                            date={item.date}
                            taskList={taskList.filter(task => task.date === item.date)}
                            holydays={holydays.filter(holyday => holyday.date === item.date)}
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
        </>
    );
}
