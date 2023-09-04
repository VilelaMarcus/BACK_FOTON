require('dotenv').config();
import express, { Response } from 'express';
import cors from 'cors';
import validateEnv from './utils/validateEnv';
import { PrismaClient } from '@prisma/client';
import redisClient from './utils/connectRedis';
import userRoute from './routes/user-routes';
import laserRouter from './routes/laser-routes';
import customerRouter from './routes/custumer-routes';
import visitMeasurementRouter from './routes/custumer-visit-measurement-routes';


const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

async function bootstrap() {
  // API Routes
  app.use('/user', userRoute);
  app.use('/laser', laserRouter);
  app.use('/customer', customerRouter);
  app.use('/custumerMeasurement', visitMeasurementRouter);
  

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

