import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getLaserAndCustomerHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  
  const lasers = await prisma.laser.findMany();
  
  const customers = await prisma.laserOfCustomer.findMany();

  if (lasers === null) {
    throw new HttpError(404, 'Not found');
  }

  await prisma.$disconnect();
  response.status(200).json({
    response: {
      lasers,
      customers
    },
  });
};

export default getLaserAndCustomerHandler;