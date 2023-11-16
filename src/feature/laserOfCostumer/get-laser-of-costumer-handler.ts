import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getLaserOfCustumerHandler: ApiHandler = async ({ request, response }) => {
  
  const prisma = new PrismaClient();
  const laserOfCustomer = await prisma.laserOfCustomer.findMany();

  
  if (laserOfCustomer === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json(laserOfCustomer);
};

export default getLaserOfCustumerHandler;
