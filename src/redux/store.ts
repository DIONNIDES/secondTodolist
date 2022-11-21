import {AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistReducer} from './todolist-reducer';
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare)
)
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<T = void> = ThunkAction<T,
    AppRootStateType,
    unknown,
    AnyAction>

//export type ThunkAppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
