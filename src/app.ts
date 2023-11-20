require('dotenv').config();
import serverless from 'serverless-http';
import express, { Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoute from './routes/user-routes';
import laserRouter from './routes/laser-routes';
import customerRouter from './routes/custumer-routes';
import visitMeasurementRouter from './routes/custumer-visit-measurement-routes';
import dashboadRouter from './routes/dashboard-routes';
import laserOfCustomerRouter from './routes/laser-of-customer-routes';
import laserCustomerRouter from './routes/laser-costumer-routes';
import osROuter from './routes/os-routes';


const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

async function bootstrap() {
  // API Routes
  app.use('/user', userRoute);
  app.use('/dashboard', dashboadRouter);
  app.use('/laser', laserRouter);
  app.use('/customer', customerRouter);
  app.use('/laserAndCostumer', laserCustomerRouter);
  app.use('/os', osROuter);
  app.use('/laserOfCustomer', laserOfCustomerRouter);
  app.use('/custumerMeasurement', visitMeasurementRouter);
  

  const port = process.env.PORT;
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

const handler = serverless(app)
export { handler }

export default app;