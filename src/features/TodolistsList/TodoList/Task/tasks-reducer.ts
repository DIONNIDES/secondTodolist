import {TasksStateType} from '../../../../app/AppWithRedux';
import {
    ADD_TODOLIST,
    AddTodolistType,
    REMOVE_TODOLIST,
    RemoveTodolistType,
    SET_TODOLISTS,
    SetTodolistsAC, updateTodolistTitleAC
} from '../todolist-reducer';
import {Dispatch} from 'redux';
import {TaskType, todolistAPI, UpdatedTaskDomainModelType, UpdatedTaskModelType} from '../../../../api/api';
import {AppRootStateType} from '../../../../app/store';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {handlerServerNetworkError, handleServerAppError} from '../../../../Components/Utills/error-utills';

//constants
const REMOVE_TASK = 'REMOVE_TASK';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const SET_TASKS = 'SET_TASKS';

let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: AllActionTypes) => {
    switch (action.type) {
        case REMOVE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.taskID)
            }
        case ADD_TASK:
            return {
                ...state,
                [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]
            }
        case UPDATE_TASK:
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    ...action.payload.domainModel
                } : t)
            }
        case ADD_TODOLIST:
            return {...state, [action.payload.todolist.id]: []}
        case REMOVE_TODOLIST:
            const {[action.payload.todolistID]: [], ...restTasks} = {...state} //через деструктуризацию
            return restTasks
        case SET_TODOLISTS:
            const stateCopy = {...state};
            action.payload.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case SET_TASKS:
            return {...state, [action.payload.todolistID]: [...action.payload.tasks]}
        default:
            return state
    }
}

//action creators
export const removeTaskAC = (todolistID: string, taskID: string) =>
    ({type: REMOVE_TASK, payload: {todolistID, taskID}} as const)

export const addTaskAC = (todolistID: string, task: TaskType) =>
    ({type: ADD_TASK, payload: {todolistID, task}} as const)


export const updateTaskAC = (todolistID: string, taskID: string, domainModel: UpdatedTaskDomainModelType) =>
    ({type: UPDATE_TASK, payload: {todolistID, taskID, domainModel}} as const)

export const setTasksAC = (todolistID: string, tasks: TaskType[]) =>
    ({type: SET_TASKS, payload: {todolistID, tasks}} as const)

//thunk creators
export const requestedTasksTC = (todolistID: string): any => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    let res = await todolistAPI.getTasks(todolistID);
    dispatch(setTasksAC(todolistID, res.data.items));
    dispatch(setAppStatusAC('succeeded'));
}

export const addTaskTC = (todolistID: string, title: string): any => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        let res = await todolistAPI.createTask(todolistID, {title})
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(todolistID, res.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(dispatch, res.data);
        }
    } catch (err: any) {
        handlerServerNetworkError(dispatch, err);
    }
}

export const removeTaskTC = (todolistID: string, taskID: string): any => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    let res = await todolistAPI.deleteTask(todolistID, taskID)
    dispatch(removeTaskAC(todolistID, taskID));
    dispatch(setAppStatusAC('succeeded'));
}

export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdatedTaskDomainModelType): any => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    let task = getState().tasks[todolistID].find(t => t.id === taskID);
    if (!task) {
        console.warn('Task is not found')
        return
    }
    const apiModel: UpdatedTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadLine: task.deadline,
        ...domainModel
    }
    dispatch(setAppStatusAC('loading'));
    let response = await todolistAPI.updateTask(todolistID, taskID, apiModel);
    try {
        if (response.data.resultCode === 0) {
            dispatch(updateTaskAC(todolistID, taskID, response.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(dispatch, response.data);
        }
    } catch (err: any) {
        handlerServerNetworkError(dispatch, err);
    }
}

//types
export type RemoveTaskType = ReturnType<typeof removeTaskAC>;
export type AddTaskType = ReturnType<typeof addTaskAC>;
export type UpdateTaskTitleType = ReturnType<typeof updateTaskAC>;
export type SetTasksACType = ReturnType<typeof setTasksAC>;
type AllActionTypes = RemoveTaskType
    | AddTaskType
    | UpdateTaskTitleType
    | RemoveTodolistType
    | AddTodolistType
    | SetTodolistsAC
    | SetTasksACType

