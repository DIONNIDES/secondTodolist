import {TodolistType} from '../AppWithRedux';
import {v1} from 'uuid';
import {
    addTodolistAC,
    changeFilterAC,
    removeTodolistAC,
    todolistReducer,
    updateTodolistTitleAC
} from './todolist-reducer';
const todolistID1 = v1();
const todolistID2 = v1();

test('state length length should become one less after using reducer', ()=>{
   const state: Array<TodolistType> = [
       {id: todolistID1, todolistTitle: 'What to learn', filter: 'all'},
       {id: todolistID2, todolistTitle: 'What to buy', filter: 'all'},
   ]
    const newState = todolistReducer(state,removeTodolistAC(todolistID1) )

    expect(state.length).toBe(2);
    expect(newState.length).toBe(1);
    expect(newState[0].todolistTitle).toBe('What to buy');
})

test('state length length should become one more after using reducer', ()=>{
    const state: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: 'What to learn', filter: 'all'},
        {id: todolistID2, todolistTitle: 'What to buy', filter: 'all'},
    ]
    const newState = todolistReducer(state,addTodolistAC('todolistTitle') )

    expect(state.length).toBe(2);
    expect(newState.length).toBe(3);
    expect(newState[2].todolistTitle).toBe('todolistTitle');
})

test('state filter should be changed', ()=>{
    const state: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: 'What to learn', filter: 'all'},
        {id: todolistID2, todolistTitle: 'What to buy', filter: 'all'},
    ]
    const newState = todolistReducer(state,changeFilterAC(todolistID1,'active') )

    expect(state[0].filter).toBe('all');
    expect(newState[0].filter).toBe('active');
    expect(newState[1].filter).toBe('all');

})

test('state title should be changed', ()=>{
    const state: Array<TodolistType> = [
        {id: todolistID1, todolistTitle: 'What to learn', filter: 'all'},
        {id: todolistID2, todolistTitle: 'What to buy', filter: 'all'},
    ]
    const newState = todolistReducer(state,updateTodolistTitleAC(todolistID1,'NewTitle') )

    expect(state[0].todolistTitle).toBe('What to learn');
    expect(newState[0].todolistTitle).toBe('NewTitle');
    expect(newState[1].todolistTitle).toBe('What to buy');

})