import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const updatePecaHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;

  const { 
    name,
    preco,
  } = request.body || '';

  if (!id) {
    throw new HttpError(404, 'Not found');
  }

  const result = await prisma.pecas.update({
    where: {
      id: id,
    },
    data: {
      ...(name && { name }),
      ...(preco && { preco }),    
    },
  });

  console.log(result);
  
  await prisma.$disconnect();
  response.status(200).json(result);
};

export default updatePecaHandler;
