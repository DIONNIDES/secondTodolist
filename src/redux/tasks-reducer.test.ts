import {TasksStateType} from '../AppWithRedux';

import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from './tasks-reducer';

let state: TasksStateType = {
    ['1']: [
        {id: '1', taskTitle: 'HTML', isDone: true},
        {id: '2', taskTitle: 'CSS', isDone: true},
        {id: '3', taskTitle: 'JS,TS', isDone: false},
        {id: '4', taskTitle: 'JS,TS', isDone: false},
    ],
    ['2']: [
        {id: '1', taskTitle: 'HTML', isDone: true},
        {id: '2', taskTitle: 'CSS', isDone: true},
        {id: '3', taskTitle: 'JS,TS', isDone: false},
        {id: '4', taskTitle: 'JS,TS', isDone: false},
    ],
}

test('Tasks array length should become one less after using reducer', () => {

    let newState = tasksReducer(state, removeTaskAC('1', '1'))

    expect(state['1'].length).toBe(4);
    expect(newState['1'].length).toBe(3);
    expect(newState).toStrictEqual({
        ['1']: [
            {id: '2', taskTitle: 'CSS', isDone: true},
            {id: '3', taskTitle: 'JS,TS', isDone: false},
            {id: '4', taskTitle: 'JS,TS', isDone: false},
        ],
        ['2']: [
            {id: '1', taskTitle: 'HTML', isDone: true},
            {id: '2', taskTitle: 'CSS', isDone: true},
            {id: '3', taskTitle: 'JS,TS', isDone: false},
            {id: '4', taskTitle: 'JS,TS', isDone: false},
        ],
    })
})


test('Tasks array length should become one more after using reducer', () => {

    let newState = tasksReducer(state, addTaskAC('1', 'REDUX'))

    expect(state['1'].length).toBe(4);
    expect(newState['1'].length).toBe(5);
})

test('Task title should be chaned after using reducer', () => {

    let newState = tasksReducer(state, updateTaskTitleAC('1', '1', 'BABEL'))

    expect(state['1'][0].taskTitle).toBe('HTML');
    expect(newState['1'][0].taskTitle).toBe('BABEL');
    expect(newState).toStrictEqual({
            ['1']: [
                {id: '1', taskTitle: 'BABEL', isDone: true},
                {id: '2', taskTitle: 'CSS', isDone: true},
                {id: '3', taskTitle: 'JS,TS', isDone: false},
                {id: '4', taskTitle: 'JS,TS', isDone: false},
            ],
            ['2']: [
                {id: '1', taskTitle: 'HTML', isDone: true},
                {id: '2', taskTitle: 'CSS', isDone: true},
                {id: '3', taskTitle: 'JS,TS', isDone: false},
                {id: '4', taskTitle: 'JS,TS', isDone: false},
            ],
        }
    )
})

test('Task status should be changed after using reducer', () => {

    let newState = tasksReducer(state, changeTaskStatusAC('1', '1', false))

    expect(state['1'][0].isDone).toBe(true);
    expect(newState['1'][0].isDone).toBe(false);
    expect(newState).toStrictEqual({
            ['1']: [
                {id: '1', taskTitle: 'HTML', isDone: false},
                {id: '2', taskTitle: 'CSS', isDone: true},
                {id: '3', taskTitle: 'JS,TS', isDone: false},
                {id: '4', taskTitle: 'JS,TS', isDone: false},
            ],
            ['2']: [
                {id: '1', taskTitle: 'HTML', isDone: true},
                {id: '2', taskTitle: 'CSS', isDone: true},
                {id: '3', taskTitle: 'JS,TS', isDone: false},
                {id: '4', taskTitle: 'JS,TS', isDone: false},
            ],
        }
    )
})