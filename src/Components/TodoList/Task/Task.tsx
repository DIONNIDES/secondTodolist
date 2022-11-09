import React from 'react';
import styles from './Task.module.css';
import SuperCheckbox from '../../../Common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../../../Common/SuperButton/SuperButton';
import {EditableSpan} from '../../../Common/EditableSpan';
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from '../../../redux/tasks-reducer';
import {useDispatch} from 'react-redux';

export type TaskType = {
    id: string
    taskTitle: string
    isDone: boolean
}

export type TaskPropsType = {
    todolistID:string
    task: TaskType
}

export const Task = ({todolistID,task}: TaskPropsType) => {

    let dispatch = useDispatch();

    const deleteTask = () => {
        dispatch(removeTaskAC(todolistID, task.id))
    }

    const changeTaskStatus = (newIsDone:boolean) => {
        debugger
        dispatch(changeTaskStatusAC(todolistID, task.id, newIsDone))
    }

    const updateTask = (taskTitle:string) => {
        dispatch(updateTaskTitleAC(todolistID, task.id, taskTitle))
    }


    return (
        <div className={styles.task_wrapper}>
            <li>
                <SuperCheckbox onChange={(e)=>changeTaskStatus(e.currentTarget.checked)} checked={task.isDone}/>
                <EditableSpan className={task.isDone ? styles.completed_task : ''}
                              title={task.taskTitle}
                              callback={(taskTitle:string)=>updateTask(taskTitle)}
                />
                {/*<span className={props.isDone ?styles.completed_task:''}>{props.taskTitle}</span>*/}
                <SuperButton title={'x'} onClick={deleteTask}/>
            </li>
        </div>
    );
};
