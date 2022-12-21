import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {Input} from "./Components/Input";
import {
    addTaskAC,
    addTaskTodolistAC,
    changeStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskAC
} from "./reducers/tasksReducer";
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistAC
} from "./reducers/todolistReducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "Harry Potter", isDone: true},
            {id: v1(), title: "The Green Mile", isDone: true},
            {id: v1(), title: "Murder on the Orient Express", isDone: false},
            {id: v1(), title: "The Fellowship of the Ring", isDone: false},
            {id: v1(), title: "The Hitchhiker's Guide to the Galaxy", isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]

    });

    const updateTodolist = (todolistID: string, newTitle: string) => {
        dispatchTodolists(updateTodolistAC(todolistID, newTitle))
    }

    const updateTask = (todolistID: string, id: string, newTitle: string) => {
        dispatchTasks(updateTaskAC(todolistID, id, newTitle))
    }

    const removeTodolist = (todolistID: string) => {
        dispatchTodolists(removeTodolistAC(todolistID))
    }

    function removeTask(todolistID: string, id: string) {
        dispatchTasks(removeTaskAC(todolistID, id))
    }

    const addTodolist = (newTitle: string) => {
        const newID = v1()
        dispatchTodolists(addTodolistAC(newTitle, newID))
        dispatchTasks(addTaskTodolistAC(newID))
    }

    function addTask(todolistID: string, title: string) {
        dispatchTasks(addTaskAC(todolistID,title))
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatchTasks(changeStatusAC(todolistID, taskId, isDone))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        dispatchTodolists(changeFilterAC(todolistID, value))
    }


    return (
        <div className="App">
            <Input callBack={addTodolist} />
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }

                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        updateTodolist={updateTodolist}
                        updateTask={updateTask}
                        removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
