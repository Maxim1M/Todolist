import React, {useState} from "react";
import {FilterValueType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    activeButton: (value: FilterValueType) => void
    addTask: (taskID: string) => void
}

export const Todolist = (props: TodolistType) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input onChange={() => props.addTask(t.id)}/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li
                            key={el.id}>
                            <button onClick={() => props.removeTask(el.id)}>x</button>
                            <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.activeButton('all')}}>All</button>
                <button onClick={() => {props.activeButton('active')}}>Active</button>
                <button onClick={() => {props.activeButton('completed')}}>Completed</button>
            </div>
        </div>
    )
}