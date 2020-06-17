import React, { useState, useEffect } from 'react';

const useInput = (defaultValue = '') => {
    const [value, setValue] = useState(defaultValue)
    return {
        value,
        setValue,
        clear: () => { setValue('') }
    }
}

const Input = ({ value, setValue, clear, ...props }) => {
    const input = React.createRef();
    useEffect(() => {
        input.current.focus();
    });
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

/*
 * 1) Bouton sauvegarder -> beforeunload si pas enregistré
 * 2) monter/descendre les taches
 * 3) focus sur le input quand on clique sur modifier
 */


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

    const myInput = useInput(task ? task.title : "");


    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            submitForm();
        }
    }

    function submitForm() {

        if (task) {
            onEdit(task.key, myInput.value);
            onFinalizeEdition();
        } else {
            onSubmit(myInput.value)
            myInput.clear()
        }
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
