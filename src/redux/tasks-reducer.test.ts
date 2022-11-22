import {TasksStateType} from '../AppWithRedux';

import {removeTaskAC, tasksReducer} from './tasks-reducer';
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
    ],
}

test('Tasks array length should become one less after using reducer', () => {

    let newState = tasksReducer(state, removeTaskAC('1', '1'))

    expect(state['1'].length).toBe(4);
    expect(newState['1'].length).toBe(3);
    expect(newState).toStrictEqual({
        ['1']: [
            {id: '2', title: 'CSS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '3', title: 'JS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '4', title: 'TS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        ],
        ['2']: [
            {id: '1', title: 'HTML', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '2', title: 'CSS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '3', title: 'JS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
            {id: '4', title: 'TS', status:TaskStatuses.New, addedDate:'', startDate:'', description:'', deadline:'',order:1, priority:TaskPriorities.Low, todoListId:'1'},
        ],
    })
})

//
// test('Tasks array length should become one more after using reducer', () => {
//
//     let newState = tasksReducer(state, addTaskAC('1', 'REDUX'))
//
//     expect(state['1'].length).toBe(4);
//     expect(newState['1'].length).toBe(5);
// })

// test('Task title should be chaned after using reducer', () => {
//
//     let newState = tasksReducer(state, updateTaskTitleAC('1', '1', 'BABEL'))
//
//     expect(state['1'][0].title).toBe('HTML');
//     expect(newState['1'][0].title).toBe('BABEL');
//     expect(newState).toStrictEqual({
//             ['1']: [
//                 {id: '1', title: 'BABEL', isDone: true},
//                 {id: '2', title: 'CSS', isDone: true},
//                 {id: '3', title: 'JS,TS', isDone: false},
//                 {id: '4', title: 'JS,TS', isDone: false},
//             ],
//             ['2']: [
//                 {id: '1', title: 'HTML', isDone: true},
//                 {id: '2', title: 'CSS', isDone: true},
//                 {id: '3', title: 'JS,TS', isDone: false},
//                 {id: '4', title: 'JS,TS', isDone: false},
//             ],
//         }
//     )
// })

// test('Task status should be changed after using reducer', () => {
//
//     let newState = tasksReducer(state, changeTaskStatusAC('1', '1', false))
//
//     expect(state['1'][0].isDone).toBe(true);
//     expect(newState['1'][0].status).toBe(false);
//     expect(newState).toStrictEqual({
//             ['1']: [
//                 {id: '1', title: 'HTML', isDone: false},
//                 {id: '2', title: 'CSS', isDone: true},
//                 {id: '3', title: 'JS,TS', isDone: false},
//                 {id: '4', title: 'JS,TS', isDone: false},
//             ],
//             ['2']: [
//                 {id: '1', title: 'HTML', isDone: true},
//                 {id: '2', title: 'CSS', isDone: true},
//                 {id: '3', title: 'JS,TS', isDone: false},
//                 {id: '4', title: 'JS,TS', isDone: false},
//             ],
//         }
//     )
// })