import React from 'react';

/**
 *
 * @param {{
 * task?: {key: number; title: string;};
 * onSubmit: Function
 * onEdit: Function
 * onFinalizeEdition: Function
 * }} props
 */
export function TaskForm({ task, onSubmit, onFinalizeEdition, onEdit }) {
    let inputId = task ? task.key : 'create-task-input';

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            submitForm();
        }
    }

    function submitForm() {
        const taskInput = document.getElementById(inputId);
        const title = taskInput.value;
        if (!task) {
            onSubmit(title);
        } else {
            onEdit(task.key, title);
            onFinalizeEdition();
        }
        taskInput.value = "";
    }

    return (
        <div>
            <div className="input-group">
                <input type="text" className="form-control" id={inputId} defaultValue={task ? task.title : ""} placeholder="Entrer le titre de la tache puis appuyer sur Entrer" onKeyUp={handleKeyDown} />
                <button className="btn btn-success create-task-button" onClick={submitForm}>OK</button>
            </div>
        </div>
    );
}