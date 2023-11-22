import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getCustomerHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  const customers = await prisma.customer.findMany();

  
  if (customers === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json(customers);
};

export default getCustomerHandler;
