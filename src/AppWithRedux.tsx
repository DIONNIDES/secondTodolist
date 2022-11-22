import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from './Components/TodoList/TodoList';
import {SuperInputAndButton} from './Common/SuperInputAndButton';
import {addTodolistTC, removeTodolistTC, requestedTodolistsTC, updateTodolistTC} from './redux/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';
import {TaskType, TodolistType} from './api/api';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = memo(() => {
    let todolists: Array<TodolistDomainType> = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    let dispatch = useDispatch();

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID));
    }, [dispatch]);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    const updateTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(updateTodolistTC(todolistID, title));
    }, [dispatch]);


    const mapTodolists = todolists.map((tl) => {
            return (
                <TodoList
                    key={tl.id}
                    todolistID={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTodolistTitle={updateTodolistTitle}
                />
            );
        }
    );

    useEffect(() => {
        dispatch(requestedTodolistsTC())
    }, [])
    return (
        <div className="App_wrapper">
            <SuperInputAndButton callback={addTodolist}/>
            {
                todolists.length > 0 ?
                    mapTodolists :
                    'There are no one todolist...'
            }
        </div>
    );
})

export default AppWithRedux;



