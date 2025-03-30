/*
 * tRPC Client
 * 
 * This file should:
 * 1. Import the AppRouter type from the server
 * 2. Create a tRPC client using @trpc/client
 * 3. Configure the client with httpBatchLink
 * 4. Use the transformer from shared/transformer.ts
 * 5. Demonstrate usage of each procedure:
 *    - List all todos
 *    - Get a todo by ID
 *    - Create a new todo
 *    - Update a todo
 *    - Delete a todo
 */

import { AppRouter } from "@/server/index.js";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

// create the client
// How do we do this? 

const client = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        })
    ]
})

const logTodos = async (modifier?: string) => {
    const todos = await client.todo.read.query()
    const header = modifier ? `todos (${modifier}):` : 'todos:'
    console.log(header)
    console.log(todos, '\n')
}

async function main() {
    // Hello tRPC
    console.log(await client.helloTRPC.query());
    
    // log empty todos
    await logTodos('should be empty');
    
    const createdTodo = await client.todo.create.mutate({
        title: 'Learn tRPC',
        description: 'the foundation for my current goal to learn tRPC, tanstack, and zod',
        completed: false,
    });
    console.log('expected new todo we created: ');
    console.log(createdTodo, '\n');

    // log todos after create
    await logTodos(`should contain only above created entry`);

    // update todos
    await client.todo.update.mutate({
        id: createdTodo.id,
        completed: true,
    });
    console.log('todo update complete');

    // log todos after update
    await logTodos('after update');

    // delete todo
    await client.todo.delete.mutate({ id: createdTodo.id });
    
    // log todos after delete
    await logTodos('should be empty after delete');
}

main()


