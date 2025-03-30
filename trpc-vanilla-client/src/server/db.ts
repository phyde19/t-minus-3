/*
 * Mock Database
 * 
 * This file should:
 * 1. Import the Todo type from shared/types.ts
 * 2. Create an in-memory array to store todos
 * 3. Implement CRUD operations:
 *    - findMany: Return all todos
 *    - findById: Find a todo by ID
 *    - create: Create a new todo with generated ID and timestamp
 *    - update: Update an existing todo
 *    - delete: Remove a todo by ID
 */

import { Todo, UpdateTodo } from "@/shared/types.js";

export let todos: Todo[] = []

export const db = {
    todos: {
      create: (todo: Todo) => {
        todos.push(todo);
        return todo; // Return the created todo for consistency
      },
  
      findMany: (): Todo[] => {
        return todos; // Return all todos
      },
  
      update: (id: string, updates: UpdateTodo) => {
        const todo = todos.find((todo) => todo.id === id);
        if (!todo) return null; // Return null if not found
  
        for (const key in updates) {
          const updateKey = key as keyof UpdateTodo;
          const updateValue = updates[updateKey];
          if (updateValue !== undefined) {
            (todo as any)[updateKey] = updateValue;
          }
        }
        return todo; // Return the updated todo
      },
  
      delete: (id: string) => {
        const initialLength = todos.length;
        todos = todos.filter((todo) => todo.id !== id);
        return todos.length < initialLength; // Return true if something was deleted
      },
    },
  };




