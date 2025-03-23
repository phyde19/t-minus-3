# Typescript

## The TS Ecosystem Toolbox
You don’t need to memorize every tool—you just need to understand the categories:


| Tool Purpose      | Common Tools                                  |
|-------------------|-----------------------------------------------|
| TS Compilation    | tsc, esbuild, swc, tsup, vite, bun             |
| Server Runtime    | express, fastify, http, hono, koa             |
| Dev Experience    | ts-node-dev, nodemon, vite, bun               |
| Bundlers          | esbuild, vite, webpack, rollup                |
| Environment       | dotenv, dotenv-flow, envsafe                  |
| Lint/Format       | eslint, prettier, biome, rome                 |


## Building and Running Typescript Files

### 1) Option 1: Explicit build and run steps which `typescript` dev-dependency
```bash
touch hello-typescript.ts # create a typescript file
# edit the file
... 

npm i -D typescript           # install typescript/tsc as dev dependency
npx tsc hello-typescript.ts   # compile typescript to javascript
node hello-typescript.js      # run compiled javascript file
```

### 2) Option 2: tsx to build and run without typechecking
Note: You don't actually have to install tsx. This is just nice so you can also run with npm later if desired. npx has a cache and will install tsx there if needed. 
```bash
touch hello-typescript.ts # create a typescript file
# edit the file
... 

npm i -D tsx                  # (optional) install tsx.  
npx tsx hello-typescript.ts   # run typescript file. Uses local tsx if present
```

### 3) Option 3: tsx, tsc, and package.json scripts for project level typescript execution
#### i. install dependencies
```bash
npm i -D tsc tsx
```
#### ii. init tsconfig.json
```bash
npm tsc --init
```
```json
// creates config like:

{
  "compilerOptions": {
    // target: The js version to emit
    "target": "es2016",
    // module: the module system to emit
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}

/*
It tells the compiler 

1. How to interpret the code
2. How to resolve imports
3. What files to include
4. Whether to check types 
5. Whether to emit JavaScript

Many options carry an implicit performance vs safety tradeoff
*/

```

