import {FilterValuesType, TodolistDomainType} from '../../../app/AppWithRedux';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../../../api/api';
import {Dispatch} from 'redux';
import {RequestedStatusType, setAppErrorAC, setAppStatusAC} from '../../../app/app-reducer';
import {handlerServerNetworkError, handleServerAppError} from '../../../Components/Utills/error-utills';

//constants
export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST-FILTER';
const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE';
export const SET_TODOLISTS = 'SET_TODOLISTS';
export const SET_TODOLIST_ENTITY_STATUS = 'SET_TODOLIST_ENTITY_STATUS';

let initialState: Array<TodolistDomainType> = [];

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: AllActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST:
            return state.filter(tl => tl.id !== action.payload.todolistID);
        case ADD_TODOLIST:
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state];
        case CHANGE_TODOLIST_FILTER:
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.filter} : tl);
        case UPDATE_TODOLIST_TITLE:
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, title: action.payload.title} : tl);
        case SET_TODOLISTS:
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case SET_TODOLIST_ENTITY_STATUS:
            return state.map(tl => tl.id === action.payload.todolistID ? {
                ...tl,
                entityStatus: action.payload.entityStatus
            } : tl);
        default:
            return state
    }
}

//action creators
export const removeTodolistAC = (todolistID: string) =>
    ({type: REMOVE_TODOLIST, payload: {todolistID}} as const)

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: ADD_TODOLIST, payload: {todolist}} as const)

export const changeFilterAC = (todolistID: string, filter: FilterValuesType) =>
    ({type: CHANGE_TODOLIST_FILTER, payload: {todolistID, filter}} as const)

export const updateTodolistTitleAC = (todolistID: string, title: string) =>
    ({type: UPDATE_TODOLIST_TITLE, payload: {todolistID, title}} as const)

export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: SET_TODOLISTS, payload: {todolists}} as const)

export const setTodolistEntityStatusAC = (todolistID: string, entityStatus: RequestedStatusType) =>
    ({type: SET_TODOLIST_ENTITY_STATUS, payload: {todolistID, entityStatus}} as const)

//thunk creators
export const requestedTodolistsTC = (): any => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    let response = await todolistAPI.getTodolists()
    dispatch(setTodolistsAC(response.data));
    dispatch(setAppStatusAC('succeeded'));
}

export const addTodolistTC = (title: string): any => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        let response = await todolistAPI.createTodolist(title);
        if (response.data.resultCode === 0) {
            dispatch(addTodolistAC(response.data.data.item));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(dispatch, response.data);
        }
    } catch (error: any) {
        dispatch(setAppStatusAC('failed'));
        dispatch(setAppErrorAC(error.message));
    }
}

export const removeTodolistTC = (todolistID: string): any => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(setTodolistEntityStatusAC(todolistID, 'loading'));
    await todolistAPI.deleteTodolist(todolistID);
    dispatch(removeTodolistAC(todolistID));
    dispatch(setAppStatusAC('succeeded'));
    dispatch(setTodolistEntityStatusAC(todolistID, 'succeeded'));
}

export const updateTodolistTC = (todolistID: string, title: string): any => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC('loading'));
        let response = await todolistAPI.updateTodolist(todolistID, title)
        if (response.data.resultCode === 0) {
            dispatch(updateTodolistTitleAC(todolistID, title));
            dispatch(setAppStatusAC('succeeded'));
        } else {
            handleServerAppError(dispatch, response.data);
        }
    } catch (err: any) {
        handlerServerNetworkError(dispatch, err);
    }
}

//types
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type ChangeFilterType = ReturnType<typeof changeFilterAC>;
export type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitleAC>;
export type SetTodolistsAC = ReturnType<typeof setTodolistsAC>;
export type SetTodolistEntityStatusACType = ReturnType<typeof setTodolistEntityStatusAC>;
export type AllActionTypes = RemoveTodolistType
    | AddTodolistType
    | ChangeFilterType
    | UpdateTodolistTitleType
    | SetTodolistsAC
    | SetTodolistEntityStatusACType