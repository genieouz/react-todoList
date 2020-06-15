import React, { useState } from 'react';
import { TaskForm } from './TaskForm';

/**
 *
 * @param {{
 * task: { key: number; title: string; }
 * onClickDelete: Function
 * onEdit: Function
 * }} props
 */
export function Task({ task, onClickDelete, onEdit }) {
    const [editMode, setEditMode] = useState(false)
    return (
        !editMode
            ?
            <li className="list-group-item" >
                {task.title}
                <div className="btn-toolbar float-right">
                    <button className="fa fa-edit btn btn-primary" onClick={() => setEditMode(true)}></button>
                    <button className="fa fa-trash btn btn-danger" onClick={() => onClickDelete()}></button>
                </div>
            </li>
            :
            <li className="list-group-item" >
                <TaskForm task={task} onFinalizeEdition={() => setEditMode(false)} onEdit={onEdit} />
            </li>
    );
}