import React, {memo, useCallback, useEffect} from 'react';
import styles from './TodoList.module.css';
import {Task} from './Task/Task';
import {FilterValuesType} from '../../../app/AppWithRedux';
import SuperButton from '../../../Components/SuperButton/SuperButton';
import {SuperInputAndButton} from '../../../Components/SuperInputAndButton/SuperInputAndButton';
import {EditableSpan} from '../../../Components/EditableSpan/EditableSpan';
import {changeFilterAC} from './todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {addTaskTC, requestedTasksTC} from './Task/tasks-reducer';
import {TaskType} from '../../../api/api';
import {RequestedStatusType} from '../../../app/app-reducer';

export type TodoListPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    entityStatus:RequestedStatusType
    removeTodolist: (todolistID: string) => void
    updateTodolistTitle: (todolistID: string, todolistTitle: string) => void
}

export const TodoList = memo(({todolistID, removeTodolist, updateTodolistTitle, title, filter, entityStatus}: TodoListPropsType) => {
        let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistID]);
        let dispatch = useDispatch();

        const addTaskHandler = useCallback((taskTitle: string) => {
            dispatch(addTaskTC(todolistID, taskTitle))
        }, [dispatch]);

        const changeFilterHandlerCreator = useCallback((todolistID: string, filter: FilterValuesType) => {
            return () => dispatch(changeFilterAC(todolistID, filter))
        }, [dispatch]);

        const removeTodolistHandler = useCallback(() => {
            removeTodolist(todolistID);
        }, [dispatch]);

        const updateTodolistTitleHandler = useCallback((title: string) => {
            updateTodolistTitle(todolistID, title);
        }, [dispatch]);


        if (filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => task.status !== 2);
        } else if (filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.status === 2);
        } else {
            tasksForTodolist = tasksForTodolist
        }

        useEffect(() => {
            dispatch(requestedTasksTC(todolistID));
        }, [])
        return (
            <div className={styles.todolistWrapper}>
                <div className={styles.todolistHeader}>
                    <div><h3>
                        {/*<EditableSpan value={title} callback={updateTodolistTitleHandler}/>*/}
                        {title}
                    </h3></div>
                    <SuperButton title={'X'} className={styles.red} name={'X'} onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}/>
                </div>
                <div className={styles.todolistBody}>
                    <SuperInputAndButton callback={addTaskHandler} disabled={entityStatus === 'loading'}/>
                    <ul>
                        {tasksForTodolist.length > 0 ?
                            tasksForTodolist.map(task => <Task
                                todolistID={todolistID}
                                task={task}
                                key={task.id}
                                entityStatus={entityStatus}
                            />)
                            : <div><p>Array is empty...</p></div>
                        }
                    </ul>
                    <div className={styles.todolistButtons}>

                        <SuperButton title={'All'}
                                     onClick={changeFilterHandlerCreator(todolistID, 'all')}
                                     className={filter === 'all' ? styles.active_button : styles.defaultButton}
                        />
                        <SuperButton title={'Active'}
                                     onClick={changeFilterHandlerCreator(todolistID, 'active')}
                                     className={filter === 'active' ? styles.active_button : styles.defaultButton}
                        />
                        <SuperButton title={'Completed'}
                                     onClick={changeFilterHandlerCreator(todolistID, 'completed')}
                                     className={filter === 'completed' ? styles.active_button : styles.defaultButton}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
