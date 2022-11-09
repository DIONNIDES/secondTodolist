import {TasksStateType} from '../AppWithRedux';

import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolist-reducer';

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
    ]
};

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
});

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', taskTitle: 'CSS', isDone: false},
            {id: '2', taskTitle: 'JS', isDone: true},
            {id: '3', taskTitle: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', taskTitle: 'bread', isDone: false},
            {id: '2', taskTitle: 'milk', isDone: true},
            {id: '3', taskTitle: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})