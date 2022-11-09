import {TasksStateType} from '../AppWithRedux';
import {ADD_TODOLIST, AddTodolistType, REMOVE_TODOLIST, RemoveTodolistType} from './todolist-reducer';
import {v1} from 'uuid';

const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
const UPDATE_TASK_TITLE = 'UPDATE_TASK_TITLE';

export type RemoveTaskType = ReturnType<typeof removeTaskAC>;
export type AddTaskType = ReturnType<typeof addTaskAC>;
export type ChangeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;
export type UpdateTaskTitleType = ReturnType<typeof updateTaskTitleAC>;
type AllActionTypes = RemoveTaskType
    | AddTaskType
    | ChangeTaskStatusType
    | UpdateTaskTitleType
    | RemoveTodolistType
    | AddTodolistType

let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: AllActionTypes) => {
    switch (action.type) {
        case REMOVE_TASK: {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                [action.payload.todolistID]: [...state[action.payload.todolistID], {
                    id: v1(),
                    taskTitle: action.payload.taskTitle,
                    isDone: false
                }]
            }
        }
        case UPDATE_TASK_TITLE: {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    taskTitle: action.payload.taskTitle
                } : t)
            }
        }
        case CHANGE_TASK_STATUS: {
            debugger
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    isDone: action.payload.isDone
                } : t)
            }
        }
        case ADD_TODOLIST: {
            return {...state, [action.payload.todolistID]: []}
        }
        case REMOVE_TODOLIST: {
            const {[action.payload.todolistID]: [], ...restTasks} = {...state} //через деструктуризацию
            return restTasks
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: REMOVE_TASK,
        payload: {
            todolistID,
            taskID
        }
    } as const
}

export const addTaskAC = (todolistID: string, taskTitle: string) => {
    return {
        type: ADD_TASK,
        payload: {
            todolistID,
            taskTitle
        }
    } as const
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: CHANGE_TASK_STATUS,
        payload: {
            todolistID,
            taskID,
            isDone
        }
    } as const
}

export const updateTaskTitleAC = (todolistID: string, taskID: string, taskTitle: string) => {
    return {
        type: UPDATE_TASK_TITLE,
        payload: {
            todolistID,
            taskID,
            taskTitle
        }
    } as const
}