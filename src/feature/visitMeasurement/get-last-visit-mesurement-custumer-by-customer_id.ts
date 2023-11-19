import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler, VisitMeasurementItem } from '../../utils/types';




const getLastVisitMeasurmentCustumerByCustomerIdHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;
  console.log({id})
  console.log(id)

  const visitMeasurement = await prisma.$queryRaw<VisitMeasurementItem[]>`
    SELECT *
    FROM public."LaserOfCustomer" loc
    JOIN public."Customer" c ON loc.customer_id = c.id
    JOIN public."Laser" l ON loc.laser_id = l.id
    JOIN public."CustomerVisitMeasurement" m ON loc.id = m.laser_of_customer_id
    WHERE loc.id = ${id}
    ORDER BY TO_DATE(m.date, 'DD/MM/YYYY') DESC
    LIMIT 1;
  `;

  console.log({visitMeasurement});

  if (visitMeasurement === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json(visitMeasurement);
};

export default getLastVisitMeasurmentCustumerByCustomerIdHandler;
