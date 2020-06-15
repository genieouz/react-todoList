import React from 'react';
import { Task } from './Task';

/**
 * 
 * @param {{
 * tasks: [{ key: number; title: string; }]
 * onRemoveTask: Function
 * }} props 
 */
export function TaskList({ tasks, onRemoveTask }) {
    const tasksDOMElements = [];
    for (let i = tasks.length - 1; i >= 0; i--) {
        tasksDOMElements.push(
            <ul className="list-group" key={tasks[i].key}>
                <Task task={tasks[i]} onClickDelete={() => onRemoveTask(i)} />
            </ul>)
    }
    return tasksDOMElements;
}