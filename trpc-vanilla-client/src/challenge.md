# tRPC Challenge 1: Todo API

## Objective
Build a simple Todo API with tRPC that implements CRUD operations.

## Requirements

### 1. Server Implementation
Create a tRPC server with the following procedures:
- `todoList`: Returns all todos
- `todoById`: Returns a single todo by ID
- `todoCreate`: Creates a new todo
- `todoUpdate`: Updates an existing todo
- `todoDelete`: Deletes a todo by ID

### 2. Data Model
Each todo should have:
- `id`: string
- `title`: string (required)
- `completed`: boolean (defaults to false)
- `description`: string (optional)
- `createdAt`: Date

### 3. Input Validation
Use Zod to validate inputs for:
- Creating todos (title required, description optional)
- Updating todos (all fields optional)
- Getting/deleting todos by ID (must be a valid ID)

### 4. Client Implementation
Create a tRPC client that:
- Connects to your server
- Makes at least one call to each procedure
- Demonstrates type safety by showing the inferred types

## Directory Structure
```
c1/
├── src/
│   ├── server/
│   │   ├── db.ts         # Mock database
│   │   ├── trpc.ts       # tRPC initialization
│   │   ├── index.ts      # Server entry point
│   │   └── routers/
│   │       └── todo.ts   # Todo router
│   ├── client/
│   │   └── index.ts      # Client implementation
│   └── shared/
│       ├── types.ts      # Shared types
│       └── transformer.ts # Data transformer (optional)
└── tsconfig.json        # TypeScript configuration
```

## Success Criteria
1. Server properly initializes and listens on port 3000
2. All CRUD operations work correctly
3. Input validation properly handles valid and invalid inputs
4. Client successfully communicates with the server
5. Complete type safety between client and server

## Hints
- Start by setting up the TRPC server with basic procedures
- Create a simple in-memory database for todos
- Implement the router with proper input validation
- Create the client and test all operations

## Bonus Challenges
1. Add error handling for missing todos
2. Implement query filtering (e.g., get all completed todos)
3. Add pagination support
4. Implement optimistic updates on the client