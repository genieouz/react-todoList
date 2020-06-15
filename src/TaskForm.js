import React from 'react';

/**
 *
 * @param {{
 * onSubmit: Function
 * }} props
 */
export function TaskForm({ onSubmit }) {
    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            onSubmit(event.target.value);
            event.target.value = "";
        }
    }
    return (
        <div>
            <input type="text" className="form-control" placeholder="Entrer le titre de la tache puis appuyer sur Entrer" onKeyDown={handleKeyDown} />
        </div>
    );
}