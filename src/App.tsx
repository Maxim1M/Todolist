import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type ValueButton = 'all' | 'active' | 'completed'

function App() {
    let [tasks1, setTasks1] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Native ", isDone: false}
    ])

    //delete tasks
    function deleteTasks(taskID: string) {
        tasks1 = tasks1.filter(t => t.id !== taskID)
        setTasks1(tasks1)
    }

    //filter tasks
    let[remTas,setRemTas] = useState<ValueButton>('all')
    let removeTasks = tasks1
    function filteredTasks (f: ValueButton) {
        setRemTas(f)
    }
    if (remTas === 'active') {
        removeTasks = tasks1.filter(fil => !fil.isDone)
    } else if (remTas === 'completed') {
        removeTasks = tasks1.filter(fil => fil.isDone)
    }

    return (
        <div>
            <Todolist
                title={'What to learn'}
                tasks={removeTasks}
                deleteTasks={deleteTasks}
                filteredTasks={filteredTasks}
            />
        </div>
    );
}

export default App;
