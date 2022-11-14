import React from "react";
import {ValueButton} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    deleteTasks: (taskID: string) => void
    filteredTasks: (f: ValueButton) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>{props.tasks.map((el)=> {
                return (
                    <li key={el.id}>
                    <button onClick={()=>{props.deleteTasks(el.id)}}>x</button>
                    <input type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                    </li>
                )
            })}
            </ul>
            <div>
                <button onClick={() => {props.filteredTasks('all')}}>All</button>
                <button onClick={() => {props.filteredTasks('active')}}>Active</button>
                <button onClick={() => {props.filteredTasks('completed')}}>Completed</button>
            </div>
        </>
    )
}