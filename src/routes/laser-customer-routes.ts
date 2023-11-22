import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserAndCustomerHandler from '../feature/laser/get-laser-and-customer-handler';
import getLastVisitMeasurmentCustomerByCustomerIdHandler from '../feature/visitMeasurement/get-last-visit-mesurement-customer-by-customer_id';

const laserCustomerRouter = Router();

laserCustomerRouter.get('/',  createRoute(getLaserAndCustomerHandler));
laserCustomerRouter.get('/:id',  createRoute(getLastVisitMeasurmentCustomerByCustomerIdHandler));

export default laserCustomerRouter;
