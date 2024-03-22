import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getOsByLaserId from '../feature/OS/get-os-by-laser-id.-handler';
import getOsHandler from '../feature/OS/get-os-handler';
import createOsHandler from '../feature/OS/create-os-handler';
import deleteOsHandler from '../feature/OS/delete-os-by-id';
import updateOsHandler from '../feature/OS/update-os-handler';
import createNewVisitByOShandler from '../feature/mobile/visit-measurment-os-handles';

import createNewVisitByOShandler from '../feature/mobile/visit-measurment-os-handles';

const osROuter = Router();

osROuter.get('/',  createRoute(getOsHandler));
osROuter.post('/',  createRoute(createOsHandler));
osROuter.post('/visit-measurment', createRoute(createNewVisitByOShandler));
osROuter.get('/:id', createRoute(getOsByLaserId));
osROuter.put('/:id', createRoute(updateOsHandler));
osROuter.delete('/:id', createRoute(deleteOsHandler));

export default osROuter;
