# tRPC Challenge 1: Todo API

This challenge will help you build a complete tRPC application with a Todo API that implements CRUD operations.

## Running the Challenge

1. Start the server:
```bash
cd trpc-challenges
npm run dev:server
```

2. In another terminal, test the client:
```bash
cd trpc-challenges
npm run dev:client
```

## Challenge Structure

```
c1/
├── server/
│   ├── db.ts         # Mock database implementation
│   ├── trpc.ts       # tRPC initialization
│   ├── index.ts      # Server entry point
│   └── routers/
│       └── todo.ts   # Todo router with CRUD operations
├── client/
│   └── index.ts      # Client implementation
└── shared/
    ├── types.ts      # Shared type definitions
    └── transformer.ts # Data transformation setup
```

## Your Task

Follow the comments in each file to implement the Todo API. Each file has specific instructions on what to implement.

### Testing Your Implementation

Once you've implemented all the files, you can run the server and client to see if they work correctly. The client should be able to:

1. List all todos
2. Get a todo by ID
3. Create a new todo
4. Update a todo
5. Delete a todo

## Learning Objectives

- Setting up a tRPC server and client
- Creating and exposing procedures
- Using Zod for input validation
- Achieving full type safety between client and server
- Working with data transformers for complex types like Date