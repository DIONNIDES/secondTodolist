import React, {ChangeEvent, KeyboardEvent, KeyboardEventHandler, memo, useState} from 'react';
import {SuperInputText} from './SuperInput/SuperInputText';

export type PropsType = {
    title: string
    className:string
    callback:(title:string)=>void
}

export const EditableSpan = memo((props:PropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.title);

    const ActivateEditMode = () => {
        setEditMode(true);
    }
    const ActivateViewMode = () => {
        props.callback(title);
        setEditMode(false);
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
       e.key ==='Enter' && ActivateViewMode();

    }

    return (
        editMode
            ? <SuperInputText onKeyPress={onKeyPressHandler} onChange={onChangeHandler} value={title} autoFocus={true} onBlur={ActivateViewMode}/>
            : <span className={props.className} onDoubleClick={ActivateEditMode}>{props.title}</span>

    );
});
