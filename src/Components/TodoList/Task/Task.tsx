import React from 'react';
import styles from './Task.module.css';
import SuperCheckbox from '../../../Common/SuperCheckbox/SuperCheckbox';
import SuperButton from '../../../Common/SuperButton/SuperButton';
import {EditableSpan} from '../../../Common/EditableSpan';
import {removeTaskTC, updateTaskAC, updateTaskTC} from '../../../redux/tasks-reducer';
import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from '../../../api/api';

export type TaskPropsType = {
    todolistID:string
    task: TaskType
}

export const Task = ({todolistID,task}: TaskPropsType) => {

    let dispatch = useDispatch();

    const deleteTask = () => {
        dispatch(removeTaskTC(todolistID, task.id))
    }

    const changeTaskStatus = (value:boolean) => {
        let status = value ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistID, task.id, {status:status}))
    }

    const updateTask = (title:string) => {
        dispatch(updateTaskTC(todolistID, task.id, {title:title}))
    }


    return (
        <div className={styles.task_wrapper}>
            <li>
                <SuperCheckbox onChange={(e)=>changeTaskStatus(e.currentTarget.checked)} checked={task.status===2}/>
                <EditableSpan className={task.status===2 ? styles.completed_task : ''}
                              title={task.title}
                              callback={(taskTitle:string)=>updateTask(taskTitle)}
                />
                {/*<span className={props.isDone ?styles.completed_task:''}>{props.title}</span>*/}
                <SuperButton title={'x'} onClick={deleteTask}/>
            </li>
        </div>
    );
};
