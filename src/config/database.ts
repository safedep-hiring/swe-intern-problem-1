import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

process.on('beforeExit', async () => {
    await prisma.$disconnect();
    console.log("Prisma Client is disconnecting...");
  });

export { prisma };
