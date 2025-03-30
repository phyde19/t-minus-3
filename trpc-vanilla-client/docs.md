# tRPC Quickstart Guide

tRPC combines concepts from REST and GraphQL. If you are unfamiliar with either, take a look at the key Concepts.

## Installation

tRPC is divided into several packages, allowing you to install only what you need. Ensure you install packages in the correct sections of your codebase. For simplicity, we'll use the vanilla client. For framework-specific guides, refer to [React](#) and [Next.js](#) usage.

### Requirements
- TypeScript version **>=5.7.2**
- Recommended: Enable `"strict": true` in your `tsconfig.json`.

Install the server and client packages:

```bash
npm install @trpc/server @trpc/client
```

## Defining a Backend Router

Let's build a typesafe API with three endpoints:

```typescript
type User = { id: string; name: string; };

userList: () => User[];
userById: (id: string) => User;
userCreate: (data: { name: string }) => User;
```

### 1. Create a Router Instance

Initialize the backend (usually in a separate file):

**`server/trpc.ts`**
```typescript
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
```

Initialize the main router:

**`server/index.ts`**
```typescript
import { router } from './trpc';

const appRouter = router({
  // procedures will be added here
});

export type AppRouter = typeof appRouter;
```

### 2. Add a Query Procedure

Add a `userList` query:

**`server/index.ts`**
```typescript
import { db } from './db';
import { publicProcedure, router } from './trpc';

const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users: User[] = await db.user.findMany();
      return users;
    }),
});
```

### 3. Validate Procedure Inputs with Input Parser

Use an input parser (e.g., Zod):

**`server.ts`**
```typescript
import { z } from 'zod';

const appRouter = router({
  userById: publicProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const user: User | undefined = await db.user.findById(input);
      return user;
    }),
});
```
> **Note:** We'll use Zod for validation throughout this guide.

### 4. Adding a Mutation Procedure

Define a mutation to create a user:

**`server.ts`**
```typescript
const appRouter = router({
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const user = await db.user.create(input);
      return user;
    }),
});
```

## Serving the API

Serve the router using a standalone adapter:

**`server/index.ts`**
```typescript
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const appRouter = router({
  // your procedures here
});

const server = createHTTPServer({ router: appRouter });

server.listen(3000);
```

## Client Setup

Achieve full type safety by importing `AppRouter`:

### 1. Setup the Client

**`client/index.ts`**
```typescript
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';

const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({ url: 'http://localhost:3000' }),
  ],
});
```

Links control data flow; `httpBatchLink` batches multiple requests.

### 2. Querying & Mutating

Invoke API procedures:

**`client/index.ts`**
```typescript
const user = await trpc.userById.query('1');
// user inferred as { name: string; id: string } | undefined

const createdUser = await trpc.userCreate.mutate({ name: 'sachinraja' });
// createdUser inferred as { name: string; id: string }
```

### Autocompletion

Enjoy full autocompletion support in your IDE:

```typescript
trpc.u; // Autocomplete shows userById, userCreate, userList
```

See the full backend code
server/db.ts
type User = { id: string; name: string };
 
// Imaginary database
const users: User[] = [];
export const db = {
  user: {
    findMany: async () => users,
    findById: async (id: string) => users.find((user) => user.id === id),
    create: async (data: { name: string }) => {
      const user = { id: String(users.length + 1), ...data };
      users.push(user);
      return user;
    },
  },
};

server/trpc.ts
import { initTRPC } from '@trpc/server';
 
const t = initTRPC.create();
 
export const router = t.router;
export const publicProcedure = t.procedure;

server/index.ts
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db";
import { publicProcedure, router } from "./trpc";
 
const appRouter = router({
  userList: publicProcedure
    .query(async () => {
      const users = await db.user.findMany();
      return users;
    }),
  userById: publicProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;
      const user = await db.user.findById(input);
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const user = await db.user.create(input);
      return user;
    }),
});
 
export type AppRouter = typeof appRouter;
 
const server = createHTTPServer({
  router: appRouter,
});
 
server.listen(3000);

## Next Steps
- Explore [example apps](#) for framework-specific integrations.
- Use [Superjson](#) as a Data Transformer to preserve complex types (e.g., `Date`).
- Check advanced tooling for [React](#) and [Next.js](#).

