import React from 'react';
import { Task } from './Task';

/**
 * 
 * @param {{
 * tasks: [{ key: number; title: string; }]
 * onRemoveTask: Function
 * onEdit: Function
 * moveDown: Function
 * moveUp: Function
 * }} props 
 */
export function TaskList({ tasks }) {

    return tasks.map((task, i) => {
        return (<ul className="list-group" key={task.key}>
            <Task task={task} />
        </ul>);
    });
}