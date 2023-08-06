import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getVisitMeasurmentHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const visitMeasurment = await prisma.$queryRaw`
  SELECT *
	FROM public."LaserOfCustomer" loc
	JOIN public."Customer" c ON loc.customer_id = c.id
	JOIN public."Laser" l ON loc.laser_id = l.id
	JOIN public."CustomerVisitMeasurement" m ON loc.id = m.laser_of_customer_id
  WHERE l.id = 'aef8af7d-ae01-4f37-a74f-cabe537f6120';
`;

  console.log(visitMeasurment)

  if (visitMeasurment === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json({
    visitMeasurment: {
      ...visitMeasurment,
    },
  });
};

export default getVisitMeasurmentHandler;
