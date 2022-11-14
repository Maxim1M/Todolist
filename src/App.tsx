import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type ValueButton = 'all' | 'active' | 'completed'

function App() {
    let [tasks1, setTasks1] = useState([
        {id: v1(), title: "Harry Potter", isDone: true},
        {id: v1(), title: "The Green Mile", isDone: true},
        {id: v1(), title: "Murder on the Orient Express", isDone: false},
        {id: v1(), title: "The Fellowship of the Ring", isDone: false},
        {id: v1(), title: "The Hitchhiker's Guide to the Galaxy", isDone: false}
    ])

    //delete tasks
    function deleteTasks(taskID: string) {
        tasks1 = tasks1.filter(t => t.id !== taskID)
        setTasks1(tasks1)
    }

    //filter tasks
    let [remTas, setRemTas] = useState<ValueButton>('all')
    let removeTasks = tasks1

    function filteredTasks(f: ValueButton) {
        setRemTas(f)
    }

    if (remTas === 'active') {
        removeTasks = tasks1.filter(fil => !fil.isDone)
    } else if (remTas === 'completed') {
        removeTasks = tasks1.filter(fil => fil.isDone)
    }

    //add newInputTasks1
    const newInputTasks1 = (n: string) => {
        let arr = {id: v1(), title: n, isDone: false}
        let newTask1 = [arr, ...tasks1]
        setTasks1(newTask1)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={removeTasks}
                deleteTasks={deleteTasks}
                filteredTasks={filteredTasks}
                newInputTasks1={newInputTasks1}
            />
        </div>
    );
}

export default App;
