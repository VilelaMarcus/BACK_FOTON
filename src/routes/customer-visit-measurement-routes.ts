import { Router } from 'express';

import createRoute from '../middleware/create-route';
import getVisitMeasurmentCustomerByLaserNameHandler from '../feature/visitMeasurement/get-visit-mesurement-customer-by-laser-name';
import getVisitMeasurmentCustomerByCustomerIdHandler from '../feature/visitMeasurement/get-visit-mesurement-customer-by-customer_id';
import updateVisitMeasurmentCustomerHandler from '../feature/visitMeasurement/update-visit-mesurement-customer';
import createVisitMeasurmentCustomerHandler from '../feature/visitMeasurement/create-visit-mesurement-customer';
import deleteVisitCustomerMeasurement from '../feature/visitMeasurement/delete-visit-measument-handler';

const visitMeasurementRouter = Router();

visitMeasurementRouter.get('/:name', createRoute(getVisitMeasurmentCustomerByLaserNameHandler));
visitMeasurementRouter.post('/', createRoute(createVisitMeasurmentCustomerHandler));
visitMeasurementRouter.get('/customerId/:id', createRoute(getVisitMeasurmentCustomerByCustomerIdHandler));
visitMeasurementRouter.patch(
    '/:id',
    createRoute(updateVisitMeasurmentCustomerHandler),
  );
  visitMeasurementRouter.delete(
    '/:id',
    createRoute(deleteVisitCustomerMeasurement),
  );
export default visitMeasurementRouter;
