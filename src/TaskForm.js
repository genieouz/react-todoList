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

const useControl = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue)
    return {
        value,
        setValue,
        clear: () => { setValue('') }
    }
}

const Input = ({ form, formControlName, ...props }) => {
    const input = useRef();
    useEffect(() => {
        input.current.focus();
    }, []);
    const control = useControl(form.value[formControlName]);
    form.setControlsValueSetters(control.setValue);
    return (
        <input
            ref={input}
            value={control.value}
            onChange={e => {
                form.setValue(formControlName, e.target.value);
                control.setValue(e.target.value);
            }}
            type="text"
            className="form-control"
            {...props}
        />
    )
}

const Select = ({ form, formControlName, ...props }) => {
    const control = useControl(form.value[formControlName]);
    return (
        <select
            value={control.value}
            onChange={e => {
                form.setValue(formControlName, Number(e.target.value));
                control.setValue(e.target.value);
            }}
            className="form-control"
            {...props}
        >
            <option value={1}>Important</option>
            <option value={0}>Pas important</option>
        </select>
    )
}




const useForm = (defaultValue = {}) => {
    const [value, setValue] = useState(defaultValue);
    const controlsValueSetters = new Set();
    const setControlsValueSetters = (valueSetter) => {
        controlsValueSetters.add(valueSetter);
    }
    return {
        controlsValueSetters,
        setControlsValueSetters,
        value,
        setValue: (controlName, controlValue) => { setValue(Object.assign(value, { [controlName]: controlValue })); },
        reset: () => {
            setValue({}); controlsValueSetters.forEach(valueSetter => {
                valueSetter('');
            })
        }
    }
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
    const form = useForm(Object.assign({ important: 1 }, task || {}));
    const { tasks, setTasks } = useContext(tasksContext);

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            submitForm();
        }
    }

    function submitForm() {

        if (task) {
            editTask(task.key, form);
            onFinalizeEdition();
        } else {
            addNewTask(form)
            myInput.clear()
        }
    }

    function addNewTask(form) {
        setTasks([...tasks, { key: tasks.length, ...form.value }]);
        form.reset();
    }

    function editTask(taskKey, form) {
        const updatedTasks = cloneArray(tasks);
        const taskIndex = updatedTasks.findIndex((task) => taskKey === task.key)
        updatedTasks[taskIndex] = form.value;
        setTasks(updatedTasks);
    }
    return (
        <div>
            <div className="input-group col-sm-12 mb-2">

                <Input
                    form={form}
                    formControlName='title'
                    placeholder="Entrer le titre de la tache puis appuyer sur Entrer" onKeyUp={handleKeyDown} />
                <Select
                    form={form}
                    formControlName='important'
                />
                <button className="btn btn-success create-task-button" onClick={submitForm}>OK</button>
            </div>
        </div>
    );
}

export default TaskForm