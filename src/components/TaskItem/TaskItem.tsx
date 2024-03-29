import React, { MouseEventHandler, useRef, useState } from "react";
import { GoTrash } from "react-icons/go";
import { SlPencil } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../redux/task/task-slice";
import { Task } from "../../redux/types/task.types";
import { ActionContainer } from "../Control/ActionContainer";
import { DeleteButtonElement } from "../Control/DeleteButton";
import { EditButtonElement } from "../Control/EditButton";
import Label from "../Label/Label";
import { LabelBox } from "./styled/LabelBox";
import { TaskBox } from "./styled/TaskBox";

type TaskItemProps = {
    task: Task,
    onDragStartHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragEndHandler: (event: React.DragEvent<HTMLDivElement>) => void,
    onDragOverHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onDragLeaveHandler: (task: Task, event: React.DragEvent<HTMLDivElement>) => void,
    onEditLabelClickHandler: (task: Task, element: HTMLDivElement | null) => void
};

export function TaskItem({
    task,
    onDragStartHandler,
    onDragEndHandler,
    onDragOverHandler,
    onDragLeaveHandler,
    onEditLabelClickHandler
}: TaskItemProps) {
    const taskNameRef = useRef<HTMLDivElement | null>(null);
    const taskElement = useRef<HTMLDivElement | null>(null);
    const [isControl, setIsControl] = useState<boolean>(false)
    const dispatch = useDispatch();
    let timeOutId: number | null = null;

    const onBlur = (id: string) => {
        if (!taskNameRef.current) return;
        dispatch(updateTask({ id, name: taskNameRef.current.textContent || "", labels: task.labels, date: task.date }))
    }

    const onMouseMoveHandler: MouseEventHandler = () => {
        setIsControl(true);
        if (typeof timeOutId === "number") {
            clearTimeout(timeOutId);
        }
        timeOutId = window.setTimeout(() => {
            setIsControl(false);
        }, 3000)
    }

    const onMouseLeaveHandler: MouseEventHandler = () => {
        if (typeof timeOutId === "number") {
            clearTimeout(timeOutId);
        }
        setIsControl(false);
    }
    const onMouseEnterHandler: MouseEventHandler = () => {
        setIsControl(true);
    }

    const onDeleteTask = (task: Task) => {
        dispatch(deleteTask(task));
    }
    return (
        <TaskBox
            draggable={true}
            onDragOver={(e) => onDragOverHandler(task, e)}
            onDragLeave={(e) => onDragLeaveHandler(task, e)}
            onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStartHandler(task, event)}
            onDragEnd={(event: React.DragEvent<HTMLDivElement>) => onDragEndHandler(event)}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
            onMouseMove={onMouseMoveHandler}
            onMouseOver={onMouseMoveHandler}
            ref={taskElement}
        >
            {isControl && (
                <ActionContainer>
                    <DeleteButtonElement
                        onClick={() => onDeleteTask(task)}
                    >
                        <GoTrash />
                    </DeleteButtonElement>
                    <EditButtonElement
                        onClick={() => onEditLabelClickHandler(task, taskElement.current)}
                    >
                        <SlPencil
                        />
                    </EditButtonElement>

                </ActionContainer>
            )}
            <LabelBox>
                {task.labels.map(label => {
                    return (
                        <Label
                            key={label}
                            color={label}
                        />
                    )
                })}
            </LabelBox>
            <div
                contentEditable={true}
                style={{ outlineStyle: "none" }}
                ref={taskNameRef}
                onBlur={() => onBlur(task.id)}
                suppressContentEditableWarning={true}
            >
                {task.name}
            </div>
        </TaskBox>
    )
}

