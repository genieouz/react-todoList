import React, { useState, useContext } from 'react';
import TaskForm from './TaskForm';
import { tasksContext } from './TodoList';
import { cloneArray } from './utils';

/**
 *
 * @param {{
 * task: { key: number; title: string; important: boolean }
 * onClickDelete: Function
 * onEdit: Function
 * moveDown: Function
 * moveUp: Function
 * }} props
 */
export function Task({ task }) {
    const [editMode, setEditMode] = useState(false);
    const { tasks, setTasks } = useContext(tasksContext);

    function moveUp() {
        const index = tasks.findIndex((currentTask) => currentTask.key === task.key);
        if (index === 0) {
            return;
        }
        const currentTasksOrder = cloneArray(tasks);
        [currentTasksOrder[index - 1], currentTasksOrder[index]] = [currentTasksOrder[index], currentTasksOrder[index - 1]];
        setTasks(currentTasksOrder);
    }

    function moveDown() {
        const index = tasks.findIndex((currentTask) => currentTask.key === task.key);
        if (index === tasks.length - 1) {
            return;
        }
        const currentTasksOrder = cloneArray(tasks);
        [currentTasksOrder[index + 1], currentTasksOrder[index]] = [currentTasksOrder[index], currentTasksOrder[index + 1]];
        setTasks(currentTasksOrder);
    }

    function removeTask() {
        const index = tasks.findIndex((currentTask) => currentTask.key === task.key);
        const tasksLeft = cloneArray(tasks);
        tasksLeft.splice(index, 1);
        setTasks(tasksLeft);
    }

    const Badge = ({ important }) => {
        if (important) {
            return <span className="badge badge-danger">Important</span>;
        } else {
            return <span className="badge badge-primary">Pas important</span>;
        }
    }

    return (
        !editMode
            ?
            <li className="list-group-item" >
                <div className="row">
                    <div className="col-sm-8">
                        {task.title}
                        <div className="float-right">
                            <Badge important={task.important} />
                        </div>

                    </div>
                    <div className="btn-toolbar col-sm-4">
                        <button className="fa fa-edit btn btn-primary" onClick={() => setEditMode(true)}></button>
                        <button className="fa fa-trash btn btn-danger" onClick={removeTask}></button>
                        <button className="fa fa-arrow-up" onClick={moveUp}></button>
                        <button className="fa fa-arrow-down" onClick={moveDown}></button>
                    </div>
                </div>
            </li>
            :
            <li className="list-group-item" >
                <TaskForm task={task} onFinalizeEdition={() => setEditMode(false)} />
            </li>
    );
}