import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getVisitMeasurmentCustumerByLaserIdHandler from '../feature/visitMeasurement/get-visit-mesurement-custumer-by-laser-id';

const visitMeasurementRouter = Router();

visitMeasurementRouter.get('/',  createRoute(getVisitMeasurmentCustumerByLaserIdHandler));
visitMeasurementRouter.get('/:name', createRoute(getVisitMeasurmentCustumerByLaserIdHandler));

export default visitMeasurementRouter;
