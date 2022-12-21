import {TasksStateType} from "../App";
import {v1} from "uuid";

type SuperType = removeTaskAC | addTaskACType | changeStatusACType | updateTaskACType | addTaskTodolistACType

export const tasksReducer = (state: TasksStateType, action: SuperType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el => el.id !== action.payload.id)}
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case "CHANGE-STATUS": {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {...el, isDone: action.payload.isDone} : el)}
        }
        case "UPDATE-TASKS": {
            return {...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.id ? {...el, title: action.payload.newTitle} : el)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newID]: []}
        }
        default: return state
    }
}

export type removeTaskAC = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistID,
            id
        }
    } as const
}

export type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistID,
            title
        }
    } as const
}

export type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        payload: {
            todolistID,
            taskId,
            isDone
        }
    } as const
}

export type updateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, id: string, newTitle: string) => {
    return {
        type: 'UPDATE-TASKS',
        payload: {
            todolistID,
            id,
            newTitle
        }
    } as const
}

export type addTaskTodolistACType = ReturnType<typeof addTaskTodolistAC>
export const addTaskTodolistAC = (newID: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newID
        }
    } as const
}

