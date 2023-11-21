import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserOfCustumerHandler from '../feature/laserOfCostumer/get-laser-of-costumer-handler';
import getLaserOfCustumerByIdHandler from '../feature/laserOfCostumer/get-laser-of-costumer-handler-by-custome_id';
import createNewEquipmenteToClient from '../feature/laserOfCostumer/create-laser-of-customer-handler';
import deleteLaserOfCustomerHandler from '../feature/laserOfCostumer/delete-laser-of-customer-handler';

const laserOfCustomerRouter = Router();

laserOfCustomerRouter.get('/',  createRoute(getLaserOfCustumerHandler));
laserOfCustomerRouter.post('/',  createRoute(createNewEquipmenteToClient));
laserOfCustomerRouter.get('/:id', createRoute(getLaserOfCustumerByIdHandler));
laserOfCustomerRouter.delete('/:id', createRoute(deleteLaserOfCustomerHandler));

export default laserOfCustomerRouter;
