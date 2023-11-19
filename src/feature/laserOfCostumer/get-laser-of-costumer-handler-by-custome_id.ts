import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getLaserOfCustumerByIdHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  
  const { id } = request.params;

  const LaserOfCustomer = await prisma.$queryRaw<String[]>`
    SELECT  *, loc.id AS id
      FROM public."LaserOfCustomer" loc
      JOIN public."Laser" l ON loc.laser_id = l.id
      WHERE loc.customer_id = ${id};
  `;


  if (LaserOfCustomer === null) {
    throw new HttpError(404, 'Not found');
  }

  console.log({LaserOfCustomer});

  await prisma.$disconnect();
  response.status(200).json(LaserOfCustomer);
};

export default getLaserOfCustumerByIdHandler;
