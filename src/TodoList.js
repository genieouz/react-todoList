import React, { useState, useEffect } from 'react';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';
import { getValueFromStorage, setValueFromStorage, compareObject } from './utils';

function cloneArray(array) {
    return array.slice();
}

export function TodoList(props) {
    const recordedListKeyName = 'todoList';
    const [tasks, setTasks] = useState([]);
    const [isRecorded, setRecordedState] = useState(true);

    function recordTodoList() {
        setValueFromStorage(recordedListKeyName, tasks);
        setRecordedState(true);
    }

    function storageHasDifferentData() {
        const recordedTasks = getValueFromStorage(recordedListKeyName);
        return recordedTasks && recordedTasks.length && !compareObject(recordedTasks, tasks);
    }

    useEffect(() => {
        if (storageHasDifferentData()) {
            setRecordedState(false);
        }
    }, [tasks]);

    useEffect(() => {
        if (storageHasDifferentData()) {
            setTasks(getValueFromStorage(recordedListKeyName));
            setRecordedState(true);
        }
    }, []);

    const handleBeforeUnload = (e) => {
        e.returnValue = 'Des données ne sont pas sauvegardées'
        return 'Des données ne sont pas sauvegardées';
    }

    useEffect(() => {
        if (!isRecorded) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    })

    function moveUp(index) {
        if (index == 0) {
            return;
        }
        const currentTasksOrder = cloneArray(tasks);
        [currentTasksOrder[index - 1], currentTasksOrder[index]] = [currentTasksOrder[index], currentTasksOrder[index - 1]];
        setTasks(currentTasksOrder);
    }

    function moveDown(index) {
        if (index == tasks.length - 1) {
            return;
        }
        const currentTasksOrder = cloneArray(tasks);
        [currentTasksOrder[index + 1], currentTasksOrder[index]] = [currentTasksOrder[index], currentTasksOrder[index + 1]];
        setTasks(currentTasksOrder);
    }

    function removeTask(i) {
        const tasksLeft = cloneArray(tasks);
        tasksLeft.splice(i, 1);
        setTasks(tasksLeft);
    }

    function addNewTask(title) {
        setTasks([...tasks, { key: tasks.length, title }]);
    }

    function editTask(taskKey, newTitle) {
        const updatedTasks = cloneArray(tasks);
        const taskIndex = updatedTasks.findIndex((task) => taskKey === task.key)
        updatedTasks[taskIndex] = { key: taskKey, title: newTitle };
        setTasks(updatedTasks);
    }


    return (
        <div className="col-sm-4 offset-sm-4">
            <div className="col-sm-12">
                <div className="card card-body bg-light mb-3">
                    <button className="btn btn-primary" onClick={recordTodoList}>ENregistrer la liste</button>
                </div>
            </div>
            <div className="col-sm-12 mb-1">
                <TaskForm onSubmit={addNewTask} />
            </div>
            <div className="col-sm-12">
                <TaskList moveUp={moveUp} moveDown={moveDown} tasks={tasks} onRemoveTask={removeTask} onEdit={editTask} />
            </div>
        </div>
    )
}