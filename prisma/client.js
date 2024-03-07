import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export const connectPrisma = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (e) {
    console.error('Error connecting to database:', e);
  }
};

export default prisma;
