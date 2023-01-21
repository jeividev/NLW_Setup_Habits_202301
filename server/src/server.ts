import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get('/api/habits', async () => {
  const habits = await prisma.habit.findMany({
    select: {
      id: true,
      title: true,
    },
    where: {
      // title: {
      //   contains: 'água',
      // },
    },
  });

  return habits;
});

app
  .listen({
    port: 3300,
  })
  .then(() => {
    console.log('Update Server');
  });
