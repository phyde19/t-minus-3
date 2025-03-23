# Understanding tsconfig 

### Good Reference:
https://www.totaltypescript.com/tsconfig-cheat-sheet

## Key mental model:

TypeScript’s compiler is like an assembly line with stages (parsing, type-checking, emitting). The tsconfig.json is your way to adjust how that assembly line operates. We can break its myriad options into a few dimensions:
- **Language output configuration** – What JavaScript should the compiler output (e.g. which JS version, what module system)?
- **Module resolution configuration** – How should the compiler find your files and imports?
- **Type checking strictness** – How cautious or lenient should the compiler be in enforcing types?
- **Emit control and output settings** – Should it emit output at all, and if so, where and in what form?
- **Project hygiene and ergonomics** – Miscellaneous options to make development smoother (catching certain mistakes, improving compile speed, etc.).

## Langauge output
### Target
**This determines the flavor of javascript the compiler emits. Things like async/await, let/const, etc**
```json
"compilerOptions": {
    ...
    "target": // "ES5", "ES2017", "ES2020", "ES2022", or "ESNext" (which mean “latest possible”)
    ...
}
```
### Module
**Determines whether commonjs or esm import/export pattern used.**  
>Unlike "module": "ESNext" or "CommonJS", which emit uniform output,
`"NodeNext"` is context-aware based on file extensions. \
package.json["type"] and typescript file extensions (.mts, .cts, .ts) determine the emitted js module resolution i.e. import/export pattern 
```json
"compilerOptions": {
    ...
    "module": // "NodeNext", "CommonJS", "ESNext", or "ES2015/ES2020/ES2022" (modern ECMAScript module syntax, i.e. using import/export in output)
    ...
    "moduleResolution": // defaults determined by module property. usually "node" for modern options and NodeNext specifically for module: NodeNext
    ...
}
```
### legacy commonjs module interoperability 
The name suggests the opposite but this is about working with commonjs modules in esm typescript code. i.e. being able to write `import fs from 'fs'`
```json
"compilerOptions": {
    ...
    "esModuleInterop": true,
    ...
}
```
## Input / Output source code
```json
{
  "compilerOptions": {
    ...
    "outDir": "dist",
    ...
  },
  "include": ["src"]
}
```