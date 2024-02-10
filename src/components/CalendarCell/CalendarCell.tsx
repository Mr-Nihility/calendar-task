import moment from "moment";
import React, { useRef } from "react";
import { Task } from "../../redux/types/task.types";
import { TaskItem } from "../TaskItem/TaskItem";
import { CalendarCellStyled } from "./styled/CalendarCellItem";
import { DayDiv } from "./styled/DayLabel";
import { TaskListBox } from "./styled/TaskListBox";

type CalendarCellProps = {
    date: Task["date"],
    taskList: Task[],
    isToday?: boolean,
    handlerDate?: () => void
    onDragStartHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragOverHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragLeaveHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragOverCellHandler: (date: string) => void,
    onCellClickHandler: (date: string) => void
}

export default function CalendarCell(
    {
        date,
        taskList,
        onCellClickHandler,
        onDragOverCellHandler,
        onDragOverHandler,
        onDragStartHandler,
        onDragLeaveHandler,
        onDragEndHandler
    }: CalendarCellProps
) {

    const tableCellElement = useRef(null);
    const onCellClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
        if (event.target !== tableCellElement.current) return;
        onCellClickHandler(date);
    }

    return (
        <CalendarCellStyled
            onDragEnter={() => onDragOverCellHandler(date)}
            onClick={onCellClick}
            ref={tableCellElement}
        >
            <DayDiv>
                <div>{+moment(date, "DD-MM-YYYY").format('DD')}</div>
                <div>{!!taskList.length && `${taskList.length} card`}</div>
            </DayDiv>
            {!!taskList.length && (
                <TaskListBox>
                    {[...taskList].sort((a, b) => a.order - b.order).map((task: Task) => {
                        return (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onDragOverHandler={onDragOverHandler}
                                onDragStartHandler={onDragStartHandler}
                                onDragLeaveHandler={onDragLeaveHandler}
                                onDragEndHandler={onDragEndHandler}
                            />
                        );
                    })}
                </TaskListBox>
            )}
        </CalendarCellStyled>
    );
}