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
        setTasks([...tasks, { key: tasks.length, title }]);
    }

    function editTask(taskIndex, newTitle) {
        const updatedTasks = cloneArray(tasks);
        updatedTasks[taskIndex] = { key: taskIndex, title: newTitle };
        setTasks(updatedTasks);
    }


    return (
        <div className="col-sm-4 offset-sm-4">
            <div className="col-sm-12 mb-1">
                <TaskForm onSubmit={addNewTask} />
            </div>
            <div className="col-sm-12">
                <TaskList tasks={tasks} onRemoveTask={removeTask} onEdit={editTask} />
            </div>
        </div>
    )
}