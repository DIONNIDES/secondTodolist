import React from 'react';
import styles from './Task.module.css';
import SuperCheckbox from '../../../../Components/SuperCheckbox/SuperCheckbox';
import SuperButton from '../../../../Components/SuperButton/SuperButton';
import {EditableSpan} from '../../../../Components/EditableSpan/EditableSpan';
import {removeTaskTC, updateTaskAC, updateTaskTC} from './tasks-reducer';
import {useDispatch} from 'react-redux';
import {TaskStatuses, TaskType} from '../../../../api/api';
import {RequestedStatusType} from '../../../../app/app-reducer';

export type TaskPropsType = {
    todolistID:string
    task: TaskType
    entityStatus:RequestedStatusType
}

export const Task = ({todolistID,task,entityStatus}: TaskPropsType) => {

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
                <SuperCheckbox onChange={(e)=>changeTaskStatus(e.currentTarget.checked)} checked={task.status===2} disabled={entityStatus === 'loading'}/>
                {/*<EditableSpan className={task.status===2 ? styles.completed_task : ''}*/}
                {/*              value={task.title}*/}
                {/*              callback={(taskTitle:string)=>updateTask(taskTitle)}*/}
                {/*/>*/}
                {task.title}
                <SuperButton title={'x'} onClick={deleteTask} disabled={entityStatus === 'loading'}/>
            </li>
        </div>
    );
};
