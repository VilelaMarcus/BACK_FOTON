import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getCustomerHandlerByLaserId: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  
  
  
  const { id } = request.params;


  const customers = await prisma.$queryRaw<String[]>`
    SELECT c.customer_name
      FROM public."LaserOfCustomer" loc
      JOIN public."Customer" c ON loc.customer_id = c.id
      JOIN public."Laser" l ON loc.laser_id = l.id
      WHERE l.id = ${id};
  `;

  console.log('teste')
  console.log({customers})

  if (customers === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json(customers);
};

export default getCustomerHandlerByLaserId;
