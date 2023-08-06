require('dotenv').config();
import express, { Response } from 'express';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import redisClient from './utils/connectRedis';
import userRoute from './routes/user-routes';
import laserRouter from './routes/laser-routes';
import customerRouter from './routes/custumer-routes';
import visitMeasurementRouter from './routes/custumer-routes copy';


const prisma = new PrismaClient();
const app = express();

async function bootstrap() {

  // API Routes
  app.use('/user', userRoute);
  app.use('/laser', laserRouter);
  app.use('/custumer', customerRouter);
  app.use('/visitMeasurement', visitMeasurementRouter);
  

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

