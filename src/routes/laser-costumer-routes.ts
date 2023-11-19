import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserAndCustomerHandler from '../feature/laser/get-laser-and-customer-handler';
import getLastVisitMeasurmentCustumerByCustomerIdHandler from '../feature/visitMeasurement/get-last-visit-mesurement-custumer-by-customer_id';

const laserCustomerRouter = Router();

laserCustomerRouter.get('/',  createRoute(getLaserAndCustomerHandler));
laserCustomerRouter.get('/:id',  createRoute(getLastVisitMeasurmentCustumerByCustomerIdHandler));

export default laserCustomerRouter;
