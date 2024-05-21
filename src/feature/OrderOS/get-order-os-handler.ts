import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getOrderOsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  
  const { id } = request.params;
  console.log('id');
  console.log({id});


  const OS = await prisma.order_OS.findMany({
    where: {
      laser_id: request.params.id,
    },
  });

  
  if (OS === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json(OS);
};

export default getOrderOsHandler;
