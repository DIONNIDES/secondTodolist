import React, {memo, useCallback} from 'react';
import styles from './TodoList.module.css';
import {Task, TaskType} from './Task/Task';
import {FilterValuesType} from '../../AppWithRedux';
import {Button} from './Button/Button';
import SuperButton from '../../Common/SuperButton/SuperButton';
import {SuperInputAndButton} from '../../Common/SuperInputAndButton';
import {EditableSpan} from '../../Common/EditableSpan';
import {changeFilterAC} from '../../redux/todolist-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/store';
import {addTaskAC} from '../../redux/tasks-reducer';

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
            dispatch(addTaskAC(todolistID, taskTitle))
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
            tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
        } else if (filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
        } else {
            tasksForTodolist = tasksForTodolist
        }
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
                    <div>

                        <Button name={'All'}
                                callback={changeFilterHandlerCreator(todolistID, 'all')}
                                className={filter === 'all' ? styles.active_button : ''}
                        />
                        <Button name={'Active'}
                                callback={changeFilterHandlerCreator(todolistID, 'active')}
                                className={filter === 'active' ? styles.active_button : ''}
                        />
                        <Button name={'Completed'}
                                callback={changeFilterHandlerCreator(todolistID, 'completed')}
                                className={filter === 'completed' ? styles.active_button : ''}
                        />
                    </div>
                </div>
            </div>
        );
    }
);
