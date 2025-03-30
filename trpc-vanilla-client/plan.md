# Todos


## state 

todos = [
    {0, 'learn tRPC', false, 'Understand the basics', 3/23/2025}
]

## operations

#### todo list
get all todos

#### todo create 
add new todo

### todo update 
update title, completion status, or description 

update({title?: string, complete?: boolean, description?: string})

### todo delete
delete a todo by id

-----------

## Mental Model

client function call -> http request -> post endpoint -> handler function

Questions 

### 1) create a tRPC server listening on port PORT?
I guess everything starts with a `router`. A router is a collection of `procedures` or other `routers`. 

#### Steps
1. const t = initTRPC.create()
2. export router, publicProcedure
3. const appRouter = rounter({... publicProcedure.query() ..})
4. const server = createHTTPServer({router: appRouter}) // Adaptor
5. server.listen(5000)


> Only one trpc server instance per application/process

#### create entrypoint
```typescript
// Entrypoint
import { initTRPC } from '@trpc/server'

const t = initTRPC.create();
```

#### create router and procedure
```typescript
// a function used to create routers
export const router = t.router();
// object with methods for creating procedure methods
export const publicProcedure = t.procedure();
```

#### create app server router
```typescript
// server/_app.ts
import { router, publicProcedure } from `./trpc`

const appRouter = router({
    greeting: publicProcedure.query(() => 'hello tRPC v11!'),
});

export type AppRouter = typeof appRouter;
```

#### create standalone server 'Adaptor'
```typescript
import { appRouter } from './_app'
import { createHTTPServer } from '@/trpc/server/adapters/standalone;'

const server = createHTTPServer({
    router: appRouter,
    createContext() {
        // this is essentially that dependency injection pattern for tRPC. 
        // Like Depends from FastAPI
        console.log('context')
        return {}
    }
    // basePath: '/trpc/', // optional, defaults to '/'
})

server.listen(5000)
``` 

#### Extra: Handling CORS
1. Install cors
You can add support yourself with the popular cors package

```bash
npm add cors
npm add -D @types/cors
```

```typescript
import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import cors from 'cors';
createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
}).listen(3333);
```

### 2) Create a tRPC vanilla client

What do we need to do? At a high level:
- Instantiate some kind of client
- Match calls to procedures on tRPC server. Actually I'd guess that the client side call API is completely determined by server procedure definition

#### Import AppRouter type
```typescript 
import type { AppRouter } from '../server/router'
```

### Initialize tRPC Client
Some questions being answered here. To answer: What are these `tRPC links`?

```typescript
import { createTRPCClient, httpBatchLink } from '@tRPC/client'

const client = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc',
            // You can pass any HTTP headers you wish here
            async headers() {
                return {
                    authorization: getAuthCookie(),
                };
            },
        })
    ]
})
```

 


