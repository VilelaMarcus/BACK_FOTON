import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getPecasHandler from '../feature/pecas/get-pecas-handler';
import createNewPeca from '../feature/pecas/create-pecas-handler';
import updatePecaHandler from '../feature/pecas/update-pecas-handler';

const pecasRouter = Router();

pecasRouter.get('/',  createRoute(getPecasHandler));
pecasRouter.post('/',  createRoute(createNewPeca));
pecasRouter.put('/:id', createRoute(updatePecaHandler));
// pecasRouter.delete('/:id', createRoute(deleteOsHandler));

export default pecasRouter;
