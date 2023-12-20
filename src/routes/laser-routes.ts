import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getLaserHandler from '../feature/laser/get-laser-handler';
import createNewEquipment from '../feature/laser/create-laser-handler';

const laserRouter = Router();

laserRouter.get('/',  createRoute(getLaserHandler));
laserRouter.get('/:name', createRoute(getLaserHandler));
laserRouter.post('/', createRoute(createNewEquipment));

export default laserRouter;
