import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {SuperInputText} from '../SuperInput/SuperInputText';

export type PropsType = {
    value: string
    className?:string
    callback:(title:string)=>void
}

export const EditableSpan = memo((props:PropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const ActivateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const ActivateViewMode = () => {
        props.callback(title);
        setEditMode(false);
    }
    const onChangeText = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
       e.key ==='Enter' && ActivateViewMode();

    }

    return (
        editMode
            ? <input onKeyPress={onKeyPressHandler} onChange={onChangeText} value={title} autoFocus onBlur={ActivateViewMode}/>
            : <span className={props.className} onDoubleClick={ActivateEditMode}>{props.value}</span>

    );
});


