import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getOrderOsHandler from '../feature/OrderOS/get-order-os-handler';
import updateOrderOsHandler from '../feature/OrderOS/update-order_os-handler';

const orderOsRouter = Router();

orderOsRouter.get('/:id',  createRoute(getOrderOsHandler));
orderOsRouter.put('/:id', createRoute(updateOrderOsHandler));

export default orderOsRouter;
