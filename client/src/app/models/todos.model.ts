import { ITodo } from './todo.model'
export interface ITodos {
    name?: string;
    role?: string;
    todos: ITodo[];
}