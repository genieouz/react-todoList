import React from 'react';
import { Task } from './Task';

/**
 * 
 * @param {{
 * tasks: [{ key: number; title: string; }]
 * onRemoveTask: Function
 * onEdit: Function
 * }} props 
 */
export function TaskList({ tasks, onRemoveTask, onEdit }) {
    return tasks.map((task, i) => {
        return (<ul className="list-group" key={task.key}>
            <Task task={task} onClickDelete={() => onRemoveTask(i)} onEdit={onEdit} />
        </ul>);
    });
}