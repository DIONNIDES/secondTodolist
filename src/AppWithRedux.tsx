import React, {memo, useCallback} from 'react';
import './App.css';
import {TodoList} from './Components/TodoList/TodoList';
import {TaskType} from './Components/TodoList/Task/Task';
import {SuperInputAndButton} from './Common/SuperInputAndButton';
import {addTodolistAC, removeTodolistAC, updateTodolistTitleAC} from './redux/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './redux/store';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id:string
    todolistTitle:string
    filter:FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = memo(() => {
    let todolists:Array<TodolistType> = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);
    let dispatch = useDispatch();

    const removeTodolist = useCallback((todolistID:string) =>{
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch]);

    const addTodolist = useCallback((todolistTitle:string) =>{
        dispatch(addTodolistAC(todolistTitle));
    },[dispatch]);

    const updateTodolistTitle = useCallback ((todolistID:string, todolistTitle:string ) =>{
        dispatch(updateTodolistTitleAC(todolistID, todolistTitle));
    },[dispatch]);

    const mapTodolists = todolists.map((tl) => {
            return (
                <TodoList
                    key={tl.id}
                    todolistID={tl.id}
                    title={tl.todolistTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTodolistTitle={updateTodolistTitle}
                />
            );
        }

    );

    return (
        <div className="App_wrapper">
            <SuperInputAndButton callback={addTodolist}/>
            {
                todolists.length >0 ?
                    mapTodolists :
                    'There are no one todolist...'
            }
        </div>
    );
})

export default AppWithRedux;



