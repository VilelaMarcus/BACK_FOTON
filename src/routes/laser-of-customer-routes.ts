import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserOfCustomerHandler from '../feature/laserOfCustomer/get-laser-of-customer-handler';
import getLaserOfCustomerByIdHandler from '../feature/laserOfCustomer/get-laser-of-customer-handler-by-custome_id';
import createNewEquipmenteToClient from '../feature/laserOfCustomer/create-laser-of-customer-handler';
import deleteLaserOfCustomerHandler from '../feature/laserOfCustomer/delete-laser-of-customer-handler';

const laserOfCustomerRouter = Router();

laserOfCustomerRouter.get('/',  createRoute(getLaserOfCustomerHandler));
laserOfCustomerRouter.post('/',  createRoute(createNewEquipmenteToClient));
laserOfCustomerRouter.get('/:id', createRoute(getLaserOfCustomerByIdHandler));
laserOfCustomerRouter.delete('/:id', createRoute(deleteLaserOfCustomerHandler));

export default laserOfCustomerRouter;
