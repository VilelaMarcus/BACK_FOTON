import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserOfCustumerHandler from '../feature/laserOfCostumer/get-laser-of-costumer-handler';
import getLaserOfCustumerByIdHandler from '../feature/laserOfCostumer/get-laser-of-costumer-handler-by-custome_id';
import createNewEquipmenteToClient from '../feature/laserOfCostumer/create-laser-of-customer-handler';
import getOsByLaserId from '../feature/OS/get-os-by-laser-id.-handler';

const osROuter = Router();

osROuter.get('/',  createRoute(getLaserOfCustumerHandler));
osROuter.post('/',  createRoute(createNewEquipmenteToClient));
osROuter.get('/:id', createRoute(getOsByLaserId));

export default osROuter;
