import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './lib/routers';

const app = Fastify();

const port: number = 3333

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port,
  })
  .then(() => {
    console.log('Update Server', new Date(), `\nhttp://localhost:${port}`);
  });
