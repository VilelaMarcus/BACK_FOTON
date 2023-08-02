/* eslint-disable no-console */
import express from 'express';
import userRoute from './routes/user-routes';
import laserRouter from './routes/laser-routes';
import customerRouter from './routes/custumer-routes';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/user', userRoute);
app.use('/laser', laserRouter);
app.use('/custumer', customerRouter);

app.use((_, response) => {
  response.status(404).send({ message: 'Oops! Nothing to see here' });
});


export default app;
