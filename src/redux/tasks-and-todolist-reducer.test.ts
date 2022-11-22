import {TasksStateType} from '../AppWithRedux';

import {tasksReducer} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolist-reducer';
import {TaskPriorities, TaskStatuses} from '../api/api';

let state: TasksStateType = {
    ['1']: [
        {id: '1', title: 'HTML', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        {id: '2', title: 'CSS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        {id: '3', title: 'JS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        {id: '4', title: 'TS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
    ],
    ['2']: [
        {id: '1', title: 'HTML', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        {id: '2', title: 'CSS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        {id: '3', title: 'JS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        {id: '4', title: 'TS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
    ]
};

test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'HTML', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '2', title: 'CSS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '3', title: 'JS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '2', title: 'molk', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '3', title: 'juice', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},

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
            {id: '1', title: 'HTML', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '2', title: 'CSS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '3', title: 'JS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '2', title: 'molk', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '3', title: 'juice', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})