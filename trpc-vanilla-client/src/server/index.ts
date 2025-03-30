/*
 * Server Entry Point
 * 
 * This file should:
 * 1. Import your todo router
 * 2. Create the app router by combining all routers
 * 3. Export the AppRouter type for the client
 * 4. Create an HTTP server using @trpc/server/adapters/standalone
 * 5. Start the server on port 3000
 */

import { publicProcedure, router } from "@/server/trpc.js";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { db } from "./db.js";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid'

const todoRouter = router({
  // create
  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        completed: z.boolean(),
        description: z.string().optional(),
      })
    )
    .mutation((opts) => {
      const newTodo = {
        id: uuidv4(),
        ...opts.input,
        createdAt: new Date()
      }
      return db.todos.create(newTodo)
    }),

  // read
  read: publicProcedure
    .query(() => {
      return db.todos.findMany()
    }),

  // update
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(), 
        completed: z.boolean().optional(), 
        description: z.string().optional(),
      })
    )
    .mutation((opts) => {
      const { id, title, completed, description } = opts.input;

      const updatePayload = { title, completed, description };
      db.todos.update(id, updatePayload)
    }),
  
  // delete 
  delete: publicProcedure
    .input(z.object({id: z.string()}))
    .mutation(({input: { id }}) => {
      db.todos.delete(id)
    })
})


const appRouter = router({
    helloTRPC: publicProcedure.query(() => 'hello tRPC'),
    todo: todoRouter
});

const server = createHTTPServer({
    router: appRouter,
    createContext() {
        console.log('context')
        return {}
    }
})

const PORT = 3000
server.listen(PORT, () => console.log(`listening on port: ${PORT}`))

export type AppRouter = typeof appRouter;