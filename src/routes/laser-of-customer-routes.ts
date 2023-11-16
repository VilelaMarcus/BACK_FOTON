import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserOfCustumerHandler from '../feature/laserOfCostumer/get-laser-of-costumer-handler';

const laserOfCustomer = Router();

laserOfCustomer.get('/',  createRoute(getLaserOfCustumerHandler));

export default laserOfCustomer;
