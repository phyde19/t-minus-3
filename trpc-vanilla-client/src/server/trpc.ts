/*
 * tRPC Server Setup
 * 
 * This file should:
 * 1. Import initTRPC from @trpc/server
 * 2. Create a new tRPC instance
 * 3. Export the router and procedure builders
 * 4. Optional: Configure context if needed
 */

import { initTRPC } from "@trpc/server";

const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure