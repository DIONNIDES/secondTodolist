import {FilterValuesType, TodolistType} from '../AppWithRedux';
import {v1} from 'uuid';

export const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
export const ADD_TODOLIST = 'ADD_TODOLIST';
const CHANGE_TODOLIST_FILTER = 'CHANGE_TODOLIST-FILTER';
const UPDATE_TODOLIST_TITLE = 'UPDATE-TODOLIST-TITLE';

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>;
export type AddTodolistType = ReturnType<typeof addTodolistAC>;
export type ChangeFilterType = ReturnType<typeof changeFilterAC>;
export type UpdateTodolistTitleType = ReturnType<typeof updateTodolistTitleAC>;
export type AllActionTypes = RemoveTodolistType
                            | AddTodolistType
                            | ChangeFilterType
                            | UpdateTodolistTitleType

/*let initialState: Array<TodolistType> = [
    {id: todolistID1, todolistTitle: 'What to learn', filter: 'all'},
    {id: todolistID2, todolistTitle: 'What to buy', filter: 'all'},
] as Array<TodolistType>*/

let initialState:Array<TodolistType> = [];

export const todolistReducer = (state: Array<TodolistType> = initialState, action: AllActionTypes):Array<TodolistType> => {
    switch (action.type) {
        case REMOVE_TODOLIST: {
            return state.filter(tl => tl.id !== action.payload.todolistID);
        }
        case ADD_TODOLIST: {
            let newTodolist:TodolistType =  {id: action.payload.todolistID, todolistTitle: action.payload.todolistTitle, filter: 'all'};
            return [...state, newTodolist ];
        }
        case CHANGE_TODOLIST_FILTER:{
            return state.map(tl=>tl.id===action.payload.todolistID ? {...tl, filter:action.payload.filter} : tl);
        }
        case UPDATE_TODOLIST_TITLE:{
            return state.map(tl=>tl.id===action.payload.todolistID ? {...tl, todolistTitle:action.payload.todolistTitle}:tl);
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

export const addTodolistAC = (todolistTitle:string) => {
    return {
        type: ADD_TODOLIST,
        payload:{
            todolistTitle,
            todolistID:v1()
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

export const updateTodolistTitleAC = (todolistID: string, todolistTitle: string) => {
    return {
        type: UPDATE_TODOLIST_TITLE,
        payload: {
            todolistID,
            todolistTitle
        }
    } as const
}