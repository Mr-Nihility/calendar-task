import moment from "moment";
import React, { useRef, useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { Holyday, Task } from "../../redux/types/task.types";
import HolydayCard from "../HolydayCard/HolydayCard";
import { TaskItem } from "../TaskItem/TaskItem";
import { AddButton } from "./styled/AddButton";
import { CalendarCellStyled } from "./styled/CalendarCellItem";
import { DayDiv } from "./styled/DayLabel";
import { TaskListBox } from "./styled/TaskListBox";

type CalendarCellProps = {
    date: Task["date"],
    holydays: Holyday[],
    taskList: Task[],
    isToday?: boolean,
    handlerDate?: () => void
    onDragStartHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragOverHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragLeaveHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragOverCellHandler: (date: string) => void,
    onCellClickHandler: (date: string) => void,
    onEditLabelClickHandler: (task: Task, element: HTMLDivElement | null) => void
}

export default function CalendarCell(
    {
        date,
        taskList,
        holydays,
        onCellClickHandler,
        onDragOverCellHandler,
        onDragOverHandler,
        onDragStartHandler,
        onDragLeaveHandler,
        onDragEndHandler,
        onEditLabelClickHandler
    }: CalendarCellProps
) {

    const [isActive, setIsActive] = useState(false);

    const tableCellElement = useRef(null);

    const onAddButtonClick: React.MouseEventHandler<HTMLOrSVGElement> = () => {
        onCellClickHandler(date);
    }

    const onMouseOverHandler = () => {
        setIsActive(true)
    }
    const onMouseLeaveHandler = () => {
        setIsActive(false)
    }



    return (
        <CalendarCellStyled
            onDragEnter={() => {
                onDragOverCellHandler(date)
                onMouseLeaveHandler()
            }}
            onMouseOver={onMouseOverHandler}
            isActive={isActive}
            onMouseLeave={onMouseLeaveHandler}
            ref={tableCellElement}
        >
            <DayDiv>
                <div>{+moment(date, "DD-MM-YYYY").format('DD')}</div>
                <div style={{
                    fontSize: "16px",
                    color: "grey"
                }}>{!!taskList.length && `${taskList.length} card`}  {!!holydays.length && `${holydays.length} holiday`}</div>
            </DayDiv>

            {isActive && (
                <AddButton
                    onClick={onAddButtonClick}
                >
                    <IoAddOutline />
                </AddButton>
            )}



            {!!holydays.length && holydays.map((holyday, i) => {
                return (
                    <HolydayCard
                        key={i}
                        name={holyday.name}
                    >
                    </HolydayCard>
                )
            })}

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
                                onEditLabelClickHandler={onEditLabelClickHandler}
                            />
                        );
                    })}
                </TaskListBox>
            )}
        </CalendarCellStyled>
    );
}