import {FilterValuesType, TodolistDomainType} from '../AppWithRedux';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../api/api';
import {Dispatch} from 'redux';

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST-FILTER';
const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE';
export const SET_TODOLISTS = 'SET_TODOLISTS';

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type ChangeFilterType = ReturnType<typeof changeFilterAC>;
export type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitleAC>;
export type SetTodolistsAC = ReturnType<typeof setTodolistsAC>;
export type AllActionTypes = RemoveTodolistType
    | AddTodolistType
    | ChangeFilterType
    | UpdateTodolistTitleType
    | SetTodolistsAC

/*let initialState: Array<TodolistType> = [
    {id: todolistID1, todolistTitle: 'What to learn', filter: 'all'},
    {id: todolistID2, todolistTitle: 'What to buy', filter: 'all'},
] as Array<TodolistType>*/

let initialState: Array<TodolistDomainType> = [];

export const todolistReducer = (state: Array<TodolistDomainType> = initialState, action: AllActionTypes): Array<TodolistDomainType> => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.payload.todolistID);
        }
        case ADD_TODOLIST: {
            let newTodolist: TodolistDomainType = {
                id: action.payload.todolistID,
                title: action.payload.todolistTitle,
                filter: 'all',
                order: 1,
                addedDate: ''
            };
            return [newTodolist, ...state];
        }
        case CHANGE_TODOLIST_FILTER: {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.filter} : tl);
        }
        case UPDATE_TODOLIST_TITLE: {
            return state.map(tl => tl.id === action.payload.todolistID ? {...tl, title: action.payload.title} : tl);
        }
        case SET_TODOLISTS: {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default: {
            return state
        }
    }
}

export const removeTodolistAC = (todolistID: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todolistID
        }
    } as const
}

export const addTodolistAC = (todolistTitle: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            todolistTitle,
            todolistID: v1()
        }
    } as const
}

export const changeFilterAC = (todolistID: string, filter: FilterValuesType) => {
    return {
        type: CHANGE_TODOLIST_FILTER,
        payload: {
            todolistID,
            filter
        }
    } as const
}

export const updateTodolistTitleAC = (todolistID: string, title: string) => {
    return {
        type: UPDATE_TODOLIST_TITLE,
        payload: {
            todolistID,
            title
        }
    } as const
}

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: SET_TODOLISTS,
        payload: {
            todolists
        }
    } as const
}


export const requestedTodolistsTC = (): any => async (dispatch: Dispatch) => {
    let response = await todolistAPI.getTodolists()
    dispatch(setTodolistsAC(response.data))
}

export const addTodolistTC = (title: string): any => async (dispatch: Dispatch) => {
    await todolistAPI.createTodolist(title)
    dispatch(addTodolistAC(title))
}

export const removeTodolistTC = (todolistID: string): any => async (dispatch: Dispatch) => {
    await todolistAPI.deleteTodolist(todolistID)
    dispatch(removeTodolistAC(todolistID))
}

export const updateTodolistTC = (todolistID: string, title: string): any => async (dispatch: Dispatch) => {
    let response = await todolistAPI.updateTodolist(todolistID, title)
    dispatch(updateTodolistTitleAC(todolistID, title))
}
