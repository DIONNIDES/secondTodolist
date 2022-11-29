import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatusAC} from '../../app/app-reducer';
import {ResponseType} from './../../api/api'

export const handleServerAppError= <D> (dispatch:Dispatch, data:ResponseType<D> ) => {
    if (data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred'));
    }
    dispatch(setAppStatusAC('failed'));
}

export const handlerServerNetworkError = (dispatch:Dispatch, error:{message:string} ) =>{
    dispatch(setAppStatusAC('failed'));
    dispatch(setAppErrorAC(error.message));
}