import React, { useState, Suspense } from 'react';
import { TaskList } from './TaskList';
import { useStorage } from './useStorage';

const TaskForm = React.lazy(() => import('./TaskForm'));

export const tasksContext = React.createContext(null);

export function TodoList(props) {

    const [tasks, setTasks] = useState([]);
    const storage = useStorage(tasks, setTasks);

    return (
        <div className="col-sm-4 offset-sm-4">
            <div className="col-sm-12">
                <div className="card card-body bg-light mb-3">
                    <button className="btn btn-primary" onClick={storage.recordTodoList}>Enregistrer la liste</button>
                </div>
            </div>
            <div className="col-sm-12 mb-1">
                < tasksContext.Provider value={{ setTasks, tasks }} >
                    <Suspense fallback={<div style={{ height: 200, backgroundColor: 'red' }}></div>}>
                        <TaskForm />
                    </Suspense>
                    <div className="col-sm-12">
                        <TaskList tasks={tasks} />
                    </div>
                </tasksContext.Provider>
            </div>

        </div>
    )
}