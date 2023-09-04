import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getCustumerHandler from '../feature/custumer/get-custumer-handler';
import getCustumerHandlerByLaserId from '../feature/custumer/get-custumer-handler-by-laser-id';

const customerRouter = Router();

customerRouter.get('/',  createRoute(getCustumerHandler));
customerRouter.get('/:id', createRoute(getCustumerHandlerByLaserId));

export default customerRouter;
