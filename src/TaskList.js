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
export function TaskList({ tasks, onRemoveTask, onEdit, moveUp, moveDown }) {
    return tasks.map((task, i) => {
        console.log('key ', task.key)
        return (<ul className="list-group" key={task.key}>
            <Task moveUp={() => moveUp(i)} moveDown={() => moveDown(i)} task={task} onClickDelete={() => onRemoveTask(i)} onEdit={onEdit} />
        </ul>);
    });
}