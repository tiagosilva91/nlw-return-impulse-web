import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ['query']
})

// criar o prisma.ts (até aqui)