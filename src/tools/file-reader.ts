import { Task } from "../redux/types/task.types";

export const importCalendar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    return new Promise<Task[] | null>((resolve) => {
        const file = event.target.files?.[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target?.result;
            if (typeof content === "string") {
                try {
                    const importedData = JSON.parse(content);
                    if (isTaskArray(importedData)) {
                        resolve(importedData)
                    } else {
                        resolve(null)
                    }
                } catch (error) {
                    resolve(null)
                }
            }
        };
        if (file) reader.readAsText(file);

    })
};
export function isTaskArray(tasks: unknown): tasks is Task[] {
    if (!Array.isArray(tasks)) {
        return false;
    }
    if (tasks.length || tasks.some(task => {
        if (typeof task === "object") {
            if ("id" in task
                && "name" in task
                && "label" in task
                && "date" in task
                && "order" in task
            ) {
                return false;
            }
        }
    })) {
        return true;
    }
    return true;
}

export const exportCalendar = (calendarData: Task[]) => {
    const jsonData = JSON.stringify(calendarData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'calendar.json';
    link.href = url;
    link.click();
};

import html2canvas from 'html2canvas';

export function downloadCalendarImage() {
    html2canvas(document.body).then(function (canvas) {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'calendar.png';
        link.href = imgData;
        link.click();
    });
}