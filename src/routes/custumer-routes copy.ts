import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getCustumerHandler from '../feature/custumer/get-custumer-handler';
import getVisitMeasurmentHandler from '../feature/visitMeasurement/get-visit-mesurement-handler';

const visitMeasurementRouter = Router();

visitMeasurementRouter.get('/',  createRoute(getVisitMeasurmentHandler));
visitMeasurementRouter.get('/:id', createRoute(getVisitMeasurmentHandler));

export default visitMeasurementRouter;
