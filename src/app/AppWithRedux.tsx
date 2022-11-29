import React, {memo} from 'react';
import './App.css';
import {TaskType, TodolistType} from '../api/api';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {Preloader} from '../Components/Preloader/Preloader';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestedStatusType} from './app-reducer';
import {ErrorSnackbar} from '../Components/ErrorSnackbar/ErrorSnackbar';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestedStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = memo(() => {
    const status = useSelector<AppRootStateType, RequestedStatusType>(state => state.app.status);
    return (
        <div className="App_wrapper">
            {status === 'loading' && <Preloader />}
            <div className='appError_position'><ErrorSnackbar /></div>
           <TodolistsList />
        </div>
    );
})

export default AppWithRedux;




