import React, {memo, useCallback, useEffect} from 'react';
import styles from './TodoList.module.css';
import {Task} from './Task/Task';
import {FilterValuesType} from '../../AppWithRedux';
import SuperButton from '../../Common/SuperButton/SuperButton';
import {SuperInputAndButton} from '../../Common/SuperInputAndButton';
import {EditableSpan} from '../../Common/EditableSpan';
import {changeFilterAC} from '../../redux/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {addTaskAC, addTaskTC, requestedTasksTC} from '../../redux/tasks-reducer';
import {TaskType} from '../../api/api';

export type TodoListPropsType = {
    todolistID: string
    title: string
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTodolistTitle: (todolistID: string, todolistTitle: string) => void
}

export const TodoList = memo(({todolistID, removeTodolist, updateTodolistTitle, title, filter}: TodoListPropsType) => {
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

        const updateTodolistTitleHandler = useCallback((todolistTitle: string) => {
            updateTodolistTitle(todolistID, todolistTitle);
        }, [dispatch]);


        if (filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => task.status!==2);
        } else if (filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.status===2);
        } else {
            tasksForTodolist = tasksForTodolist
        }

        useEffect(()=>{
            dispatch(requestedTasksTC(todolistID));
        },[])
        return (
            <div className={styles.todolistWrapper}>
                <div className={styles.todolistHeader}>
                    <div><h3>
                        <EditableSpan className={''} title={title} callback={updateTodolistTitleHandler}/>
                    </h3></div>
                    <SuperButton title={'X'} className={styles.red} name={'X'} onClick={removeTodolistHandler}/>

                </div>
                <div className={styles.todolistBody}>
                    <SuperInputAndButton callback={addTaskHandler}/>
                    <ul>
                        {tasksForTodolist.length > 0 ?
                            tasksForTodolist.map(task => <Task
                                todolistID={todolistID}
                                task={task}
                                key={task.id}
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
