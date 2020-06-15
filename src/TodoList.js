import React, { useState } from 'react';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

function cloneArray(array) {
    return array.slice();
}

export function TodoList(props) {
    const [tasks, setTasks] = useState([]);

    function removeTask(i) {
        const tasksLeft = cloneArray(tasks);
        tasksLeft.splice(i, 1);
        setTasks(tasksLeft);
    }

    function addNewTask(title) {
        const newTasks = cloneArray(tasks);
        newTasks.push({ key: tasks.length, title });
        setTasks(newTasks);
    }

    return (
        <div className="col-sm-4 offset-sm-4">
            <div className="col-sm-12 mb-1">
                <TaskForm onSubmit={(title) => addNewTask(title)} />
            </div>
            <div className="col-sm-12">
                <TaskList tasks={tasks} onRemoveTask={(i) => removeTask(i)} />
            </div>
        </div>
    )
}