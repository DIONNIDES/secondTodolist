
//constants
export const SET_APP_STATUS = 'SET_APP_STATUS';
export const SET_APP_ERROR = 'SET_APP_ERROR';

const initialState: AppInitialStateType = {
    status: 'idle',
    error: null
}


export const appReducer = (state: AppInitialStateType = initialState, action: AllActionTypes): AppInitialStateType => {
    switch (action.type) {
        case SET_APP_STATUS:
            return {...state, status:action.payload.status}
        case SET_APP_ERROR:
            return {...state, error:action.payload.error}
        default:
            return state
   }
}

//action creators
export const setAppStatusAC = (status: RequestedStatusType) =>
    ({type: SET_APP_STATUS, payload: {status}} as const )

export const setAppErrorAC = (error: string|null) =>
    ({type: SET_APP_ERROR, payload: {error}} as const )

//thunk creators
// export const requestedTodolistsTC = (): any => async (dispatch: Dispatch) => {
//     let response = await todolistAPI.getTodolists()
//     dispatch(setTodolistsAC(response.data))
// }

//types
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;

export type AllActionTypes = SetAppStatusType
     | SetAppErrorType

export type AppInitialStateType = {
    status: RequestedStatusType
    error:string | null
}

export type RequestedStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';