import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {useState} from "react";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks1] = useState([
        {id: v1(), title: "Harry Potter", isDone: true},
        {id: v1(), title: "The Green Mile", isDone: true},
        {id: v1(), title: "Murder on the Orient Express", isDone: false},
        {id: v1(), title: "The Fellowship of the Ring", isDone: false},
        {id: v1(), title: "The Hitchhiker's Guide to the Galaxy", isDone: false},
    ])

    // delete task
    function removeTask(id: string) {
        tasks = tasks.filter(task => task.id != id);
        setTasks1(tasks);
    }

    // filter

    let [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForTodolist = tasks // здесь хранятся отфильтрованные таски

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => !t.isDone)
    } else if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone)
    }

    function activeButton (value: FilterValueType) {
        setFilter(value)
    }

    //add task
    const addTask = (taskID: string) => {
        let task = {id: v1(), title: taskID, isDone: true};
        let newTask = [task, ...tasks];
        setTasks1(newTask)
    }


    return (
        <div className="App">
            <Todolist
                title={'Books'}
                tasks={tasks}
                removeTask={removeTask}
                activeButton={activeButton}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
