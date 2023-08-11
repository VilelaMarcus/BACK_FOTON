import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getVisitMeasurmentCustumerByLaserIdHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { name } = request.params;
  
  const laser = await prisma.laser.findUnique({
    where: {
    name: name,
    },
  });

  const id = laser?.id || '';


  const visitMeasurment = await prisma.$queryRaw`
  SELECT *
    FROM public."LaserOfCustomer" loc
    JOIN public."Customer" c ON loc.customer_id = c.id
    JOIN public."Laser" l ON loc.laser_id = l.id
    JOIN public."CustomerVisitMeasurement" m ON loc.id = m.laser_of_customer_id
    WHERE l.id = ${id};
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

export default getVisitMeasurmentCustumerByLaserIdHandler;
