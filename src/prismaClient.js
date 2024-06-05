// prismaClient.js
import { PrismaClient } from '@prisma/client';

let prisma = null;

const initPrisma = async () => {
    prisma = new PrismaClient();
};

const getInstance = async () => {
    
    if (prisma === null) {
        initPrisma();
    }
    
    return prisma;
};

const disconnect = async () => {
    if (prisma) {
        await prisma.$disconnect();
    }
};

export default { getInstance, initPrisma, disconnect };