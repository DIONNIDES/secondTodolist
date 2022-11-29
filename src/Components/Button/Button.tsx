import React, {memo} from 'react';

export type ButtonPropsType = {
    name: string
    callback: () => void
    className: string
}

export const Button: React.FC<ButtonPropsType> = memo((props) => {
    return (
        <button
            className={props.className}
            onClick={props.callback}>
            {props.name}
        </button>
    );
});
