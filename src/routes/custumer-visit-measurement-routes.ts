import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getVisitMeasurmentCustumerByLaserNameHandler from '../feature/visitMeasurement/get-visit-mesurement-custumer-by-laser-name';
import getVisitMeasurmentCustumerByCustomerIdHandler from '../feature/visitMeasurement/get-visit-mesurement-custumer-by-customer_id';
import updateVisitMeasurmentCustumerHandler from '../feature/visitMeasurement/update-visit-mesurement-custumer';

const visitMeasurementRouter = Router();

visitMeasurementRouter.get('/:name', createRoute(getVisitMeasurmentCustumerByLaserNameHandler));
visitMeasurementRouter.get('/customerId/:id', createRoute(getVisitMeasurmentCustumerByCustomerIdHandler));
visitMeasurementRouter.patch(
    '/:id',
    createRoute(updateVisitMeasurmentCustumerHandler),
  );

export default visitMeasurementRouter;
