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
const appRouter = router({
    helloTRPC: publicProcedure.query(() => 'hello tRPC')
});
const server = createHTTPServer({
    router: appRouter,
    createContext() {
        console.log('context');
        return {};
    }
});
server.listen(3000);
