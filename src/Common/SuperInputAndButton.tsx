import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import SuperButton from './SuperButton/SuperButton';
import {SuperInputText} from './SuperInput/SuperInputText';
import styles from '../Components/TodoList/TodoList.module.css';

export type PropsType = {
    callback:(title:string)=>void
}

export const SuperInputAndButton = memo((props:PropsType) => {

    let [taskTitle, setTaskTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
        setError(false);
    }

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            props.callback(taskTitle.trim());
            setTaskTitle('');

        }
        setError(true);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler();

    }
    return (
        <div>
            <SuperInputText
                className={error ? styles.error_input : ''}
                value={taskTitle}
                onChange={changeTitle}
                onBlur={changeTitle}
                onKeyPress={onKeyPressHandler}/>

            <SuperButton title={'+'} onClick={addTaskHandler}/>
            {error && <div>Field is required!</div>}
        </div>
    );
});
