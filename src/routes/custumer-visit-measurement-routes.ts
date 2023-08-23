import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getVisitMeasurmentCustumerByLaserIdHandler from '../feature/visitMeasurement/get-visit-mesurement-custumer-by-laser-id';
import updateVisitMeasurmentCustumerHandler from '../feature/visitMeasurement/update-visit-mesurement-custumer';

const visitMeasurementRouter = Router();

visitMeasurementRouter.get('/',  createRoute(getVisitMeasurmentCustumerByLaserIdHandler));
visitMeasurementRouter.get('/:name', createRoute(getVisitMeasurmentCustumerByLaserIdHandler));
visitMeasurementRouter.patch(
    '/:id',
    createRoute(updateVisitMeasurmentCustumerHandler),
  );

export default visitMeasurementRouter;
