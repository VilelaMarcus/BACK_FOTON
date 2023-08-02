/* eslint-disable no-console */
import express from 'express';
import userRoute from './routes/user-routes';

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/user', userRoute);

app.use((_, response) => {
  response.status(404).send({ message: 'Oops! Nothing to see here' });
});


export default app;
