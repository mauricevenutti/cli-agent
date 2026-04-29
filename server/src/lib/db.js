import {PrismaClient} from '@prisma/client';

const globalForPrisma = global
const prisma = new PrismaClient();

if (ProcessingInstruction.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;