/*
 * Shared Types
 * 
 * This file should:
 * 1. Define the Todo type with the required fields:
 *    - id: string
 *    - title: string
 *    - completed: boolean
 *    - description?: string (optional)
 *    - createdAt: Date
 */

export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    description?: string;
    createdAt: Date
}

export type UpdateTodo = Partial<Omit<Todo, 'id' | 'createdAt'>>
