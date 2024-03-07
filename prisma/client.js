import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (e) {
    console.error('Error connecting to database:', e);
  }
};

export default prisma;
