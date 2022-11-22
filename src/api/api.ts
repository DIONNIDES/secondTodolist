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
    getTasks(todolistID:string) {
        return instance.get<GetTasksType>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID:string,data:{title: string}) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistID}/tasks`, data)
    },
    deleteTask(todolistID: string, taskID:string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todolistID: string, taskID:string, model:UpdatedTaskModelType) {
        return instance.put<ResponseType<{item:TaskType}>>(`todo-lists/${todolistID}/tasks/${taskID}`, model)
    }
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}


export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority:TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

export type GetTasksType = {
    items: TaskType[]
    totalCount:number
    error:string
}

export type UpdatedTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadLine: string
}

export type UpdatedTaskDomainModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}