import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const updateOsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;

  console.log({id});
  console.log('teste');

  const { 
    description,
    type,
  } = request.body || '';

  if (!id) {
    throw new HttpError(404, 'Not found');
  }

  console.log({description});

  const result = await prisma.oS.update({
    where: {
      id: id,
    },
    data: {
      ...(description && { description }),
      ...(type && { type }),    
    },
  });

  console.log(result);
  
  await prisma.$disconnect();
  response.status(200).json(result);
};

export default updateOsHandler;
