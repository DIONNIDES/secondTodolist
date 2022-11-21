/*
import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from './Components/TodoList/TodoList';
import {TaskType} from './Components/TodoList/Task/Task';
import {v1} from 'uuid';
import {SuperInputAndButton} from './Common/SuperInputAndButton';
import {addTodolistAC, removeTodolistAC, todolistReducer, updateTodolistTitleAC} from './redux/todolist-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id:string
    todolistTitle:string
    filter:FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
   const todolistID1 = v1();
   const todolistID2 = v1();

      let [todolists, dispatch] = useReducer(todolistReducer,[
            {id: todolistID1, todolistTitle: 'What to learn', filter: 'all'},
            {id: todolistID2, todolistTitle: 'What to buy', filter: 'all'},
        ]);

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), taskTitle: 'HTML', isDone: true},
            {id: v1(), taskTitle: 'CSS', isDone: true},
            {id: v1(), taskTitle: 'JS,TS', isDone: false},
            {id: v1(), taskTitle: 'JS,TS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), taskTitle: 'HTML', isDone: true},
            {id: v1(), taskTitle: 'CSS', isDone: true},
            {id: v1(), taskTitle: 'JS,TS', isDone: false},
            {id: v1(), taskTitle: 'JS,TS', isDone: false},
        ],

    });

    const deleteTask = (todolistID:string,taskID: string) => {
      setTasks({...tasks, [todolistID]:[...tasks[todolistID].filter(task => task.id !==taskID)]});
    }
    const addTask = (todolistID:string,title: string) => {
        let newTask = {id: v1(), taskTitle: title, isDone: false};
        setTasks({...tasks, [todolistID]:[newTask, ...tasks[todolistID]]});
    }

    const changeTaskStatus = (todolistID:string,taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(t => t.id ===taskID ? {...t, isDone}: t)});
    }

    const removeTodolist = (todolistID:string) =>{
        dispatch(removeTodolistAC(todolistID));
        delete tasks[todolistID];
    }

    const addTodolist = (todolistTitle:string) =>{
        let todolistID = v1();
        dispatch(addTodolistAC(todolistTitle));
        setTasks({...tasks, [todolistID]:[
                {id: v1(), taskTitle: 'HTML', isDone: true},
                {id: v1(), taskTitle: 'CSS', isDone: true},
            ]});
    }

    const updateTaskTitle = (todolistID:string, taskID:string, taskTitle:string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t=>t.id===taskID ? {...t,taskTitle} : t) });
    }

    const updateTodolistTitle = (todolistID:string, todolistTitle:string ) =>{
        dispatch(updateTodolistTitleAC(todolistID, todolistTitle));
    }



    const mapTodolists = todolists.map((tl) => {
            return (
                <TodoList
                    key={tl.id}
                    todolistID={tl.id}
                    title={tl.todolistTitle}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    updateTodolistTitle={updateTodolistTitle}
                />
            );
        }

    );

    return (
        <div className="App_wrapper">
            <SuperInputAndButton callback={addTodolist}/>
            {
                todolists.length >0 ?
                    mapTodolists :
                    'There are no one todolist...'
            }
        </div>
    );
}

export default App;

*/

export {}