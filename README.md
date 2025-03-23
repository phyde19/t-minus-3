# 🚀 T-Minus-3: Countdown to the T3 Stack

A repository exploring prerequisites needed for the T3 stack. The name is an *extremely clever* play on words since we're "counting down" to T3 competency.

## What is this?

This repository explores some new technologies I'll need to learn for the T3 stack. In particular:

- **TypeScript** - Beyond the basics
- **tRPC** - End-to-end typesafe APIs
- **Drizzle** - Preferring this over Prisma for a few reasons (coming soon)

This repo focuses on demystifying each technology individually before combining them.

## Repository Structure

- `/src` - Source code with examples
  - `/client` - Client-side code examples
  - `/server` - Server-side code examples
  - `/shared` - Shared code between client and server
- `/notes` - Learning notes on various topics
  - [`typescript.md`](./notes/typescript.md) - TypeScript runtime tools and execution options
  - [`tsconfig.md`](./notes/tsconfig.md) - TypeScript configuration explained
  - [`trpc-package-json.md`](./notes/trpc-package-json.md) - tRPC package configuration
  - [`npx.md`](./notes/npx.md) - Notes on how npx tool works

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

This starts both the tRPC server and client in watch mode. The client automatically waits for the server to be ready before starting.

## TypeScript Configuration 📝

This project uses a carefully configured `tsconfig.json` based on the mental model that TypeScript's compiler works like an assembly line with stages (parsing, type-checking, emitting).

Key configuration choices:
- `"target": "ES2022"` - Targeting modern JavaScript features
- `"module": "NodeNext"` - Using Node.js-aware module resolution
- `"strict": true` - Enabling robust type checking
- `"moduleResolution": "NodeNext"` - Proper ESM/CommonJS detection

Check out [tsconfig notes](./notes/tsconfig.md) here for a deeper understanding of these choices.

## Development Scripts 🛠️

The package.json includes thoughtfully designed scripts:

- `npm run dev` - Starts both client and server in development mode
  - Uses `run-p` (npm-run-all parallel) to run multiple scripts simultaneously 
  - `dev:server` - Runs the server with tsx in watch mode
  - `dev:client` - Waits for port 3000 to be active, then runs the client
- `npm run build` - Compiles TypeScript to JavaScript 
- `npm run typecheck` - Runs TypeScript type checking without emitting files

These scripts leverage `tsx` for fast development without a separate build step, and `wait-port` to ensure the server is ready before the client connects.

## Current Progress

- ✅ TypeScript basics
- ✅ tRPC minimal example with working client/server communication
- 🔄 More to come...

## Implementation Path

This repository follows a progressive implementation approach:

1. **TypeScript Fundamentals** - Understanding the type system, configuration, and tooling
2. **tRPC** - Setting up a basic typesafe API between client and server
3. **More components will be added** - Next.js, Tailwind, and Drizzle coming soon

## Why This Approach?

The T3 stack is powerful but can be overwhelming when encountered all at once. By breaking it down into its components, I can:

1. Learn each technology thoroughly 
2. Understand how they interact
3. Build a mental model from the ground up
4. Create a reference implementation for others exploring these technologies

## References and Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [tRPC Documentation](https://trpc.io/)
- [T3 Stack](https://create.t3.gg/)

## License

ISC