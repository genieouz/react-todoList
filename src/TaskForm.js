import React, { useState, useEffect, useRef, useContext } from 'react';
import { tasksContext } from './TodoList';
import { cloneArray } from './utils';

const useInput = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue)
    return {
        value,
        setValue,
        clear: () => { setValue('') }
    }
}

const Input = ({ value, setValue, clear, ...props }) => {
    const input = useRef();
    useEffect(() => {
        input.current.focus();
    }, []);
    return (
        <input
            ref={input}
            value={value}
            onChange={e => {
                setValue(e.target.value)
            }}
            type="text"
            className="form-control"
            {...props}
        />
    )
}

/**
 *
 * @param {{
 * task?: {key: number; title: string;};
 * onSubmit: Function
 * onEdit: Function
 * onFinalizeEdition: Function
 * }} props
 */
function TaskForm({ task, onFinalizeEdition }) {

    const myInput = useInput(task ? task.title : "");
    const { tasks, setTasks } = useContext(tasksContext);

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            submitForm();
        }
    }

    function submitForm() {

        if (task) {
            editTask(task.key, myInput.value);
            onFinalizeEdition();
        } else {
            addNewTask(myInput.value)
            myInput.clear()
        }
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
        <div>
            <div className="input-group">

                <Input
                    {...myInput}
                    placeholder="Entrer le titre de la tache puis appuyer sur Entrer" onKeyUp={handleKeyDown} />

                <button className="btn btn-success create-task-button" onClick={submitForm}>OK</button>
            </div>
        </div>
    );
}

export default TaskForm