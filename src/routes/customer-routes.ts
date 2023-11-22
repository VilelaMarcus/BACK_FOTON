import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getCustomerHandler from '../feature/customer/get-customer-handler';
import getCustomerHandlerByLaserId from '../feature/customer/get-customer-handler-by-laser-id';
import createCustomerHandler from '../feature/customer/create-customer-handler';

const customerRouter = Router();

customerRouter.get('/',  createRoute(getCustomerHandler));
customerRouter.post('/',  createRoute(createCustomerHandler));
customerRouter.get('/:id', createRoute(getCustomerHandlerByLaserId));

export default customerRouter;
