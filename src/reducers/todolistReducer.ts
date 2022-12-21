import {FilterValuesType, TodolistType} from "../App";

type SuperType = updateTodolistACType | changeFilterACType | addTodolistACType | removeTodolistACType


export const todolistReducer = (state: TodolistType[], action: SuperType) => {
    switch (action.type) {
        case 'UPDATE-TODOLIST': {
            return state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todolistID ? {...el, filter: action.payload.value} : el)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {id: action.payload.newID, title: action.payload.newTitle, filter: 'all'}
            return [newTodolist, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todolistID)
        }
        default: return state
    }
}

export type updateTodolistACType = ReturnType<typeof updateTodolistAC>
export const updateTodolistAC = (todolistID: string, newTitle: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {
            todolistID,
            newTitle
        }
    } as const
}

export type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            todolistID,
            value
        }
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string, newID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTitle,
            newID
        }
    } as const
}

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistID
        }
    } as const
}