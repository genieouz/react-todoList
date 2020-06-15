import React from 'react';

/**
 *
 * @param {{
 * task: { key: number; title: string; }
 * onClickDelete: Function
 * }} props
 */
export function Task({ task, onClickDelete }) {
    return (
        <li className="list-group-item">
            {task.title}
            <button className="fa fa-trash btn btn-danger float-right" onClick={() => onClickDelete()}></button>
        </li>
    );
}