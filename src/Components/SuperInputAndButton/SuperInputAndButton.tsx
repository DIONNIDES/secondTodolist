import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import SuperButton from '../SuperButton/SuperButton';
import {SuperInputText} from '../SuperInput/SuperInputText';
import styles from '../../features/TodolistsList/TodoList/TodoList.module.css';

export type PropsType = {
    callback:(title:string)=>void
    disabled?:boolean
}

export const SuperInputAndButton = memo((props:PropsType) => {

    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false);
    }

    const addTaskHandler = () => {
        if (title.trim()) {
            props.callback(title.trim());
            setTitle('');

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
                value={title}
                onChange={changeTitle}
                onBlur={changeTitle}
                onKeyPress={onKeyPressHandler}/>

            <SuperButton title={'+'} onClick={addTaskHandler}/>
            {error && <div>Field is required!</div>}
        </div>
    );
});
