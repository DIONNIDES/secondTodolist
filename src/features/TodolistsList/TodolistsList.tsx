import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import React, {useCallback, useEffect} from 'react';
import {addTodolistTC, removeTodolistTC, requestedTodolistsTC, updateTodolistTC} from './TodoList/todolist-reducer';
import {TodoList} from './TodoList/TodoList';
import {SuperInputAndButton} from '../../Components/SuperInputAndButton/SuperInputAndButton';
import {TodolistDomainType} from '../../app/AppWithRedux';

export const TodolistsList = () => {
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
                    entityStatus={tl.entityStatus}
                />
            );
        }
    );

    useEffect(() => {
        dispatch(requestedTodolistsTC())
    }, [dispatch])
    return(<>
        <SuperInputAndButton callback={addTodolist}/>
        {
            mapTodolists.length > 0 ?
                mapTodolists :
                'There are no one todolist...'
        }
    </>)
}