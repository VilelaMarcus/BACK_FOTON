import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const updateOrderOsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;


  const { 
    laser_id,
    sequence_itens,
  } = request.body || '';

  console.log({id});
  console.log({sequence_itens});


  if (!id) {
    throw new HttpError(404, 'Not found');
  }

  const result = await prisma.order_OS.update({
    where: {
      id: id,
    },
    data: {
      ...(laser_id && { laser_id }),
      ...(sequence_itens && { sequence_itens }),    
    },
  });

  console.log(result);
  
  await prisma.$disconnect();
  response.status(200).json(result);
};

export default updateOrderOsHandler;
