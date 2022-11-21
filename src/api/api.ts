import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '4b505e77-20a4-4b88-91c9-9a97e6bfb421'
    }
})


export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolist(todolistID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistID}`, {title})
    },
}
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
