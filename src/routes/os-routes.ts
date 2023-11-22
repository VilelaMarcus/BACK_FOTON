import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserOfCustomerHandler from '../feature/laserOfCustomer/get-laser-of-customer-handler';
import getLaserOfCustomerByIdHandler from '../feature/laserOfCustomer/get-laser-of-customer-handler-by-custome_id';
import createNewEquipmenteToClient from '../feature/laserOfCustomer/create-laser-of-customer-handler';
import getOsByLaserId from '../feature/OS/get-os-by-laser-id.-handler';

const osROuter = Router();

osROuter.get('/',  createRoute(getLaserOfCustomerHandler));
osROuter.post('/',  createRoute(createNewEquipmenteToClient));
osROuter.get('/:id', createRoute(getOsByLaserId));

export default osROuter;
