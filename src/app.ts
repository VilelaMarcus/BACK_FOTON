require('dotenv').config();
import express, { Response } from 'express';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import redisClient from './utils/connectRedis';
import userRoute from './routes/user-routes';


const prisma = new PrismaClient();
const app = express();

async function bootstrap() {

  // API Routes
    app.use('/user', userRoute);

  const port = process.env.PORT
  app.listen(port, () => {
    console.log(`Server on port: ${port}`);
  });
}

bootstrap()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

