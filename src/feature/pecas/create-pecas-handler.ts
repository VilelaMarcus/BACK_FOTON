import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const createNewPeca: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { 
    id,  
    name,
    preco,
  } = request.body || '';

  if (!id) {
    throw new HttpError(404, 'Not found');
  }

  console.log(request.body);


  const data = {
    ...(id && { id }),                    
    ...(name && { name }),                   
    ...(preco && { preco }),                   
  };

  const result = await prisma.pecas.create({
    data: data,
  });


 await prisma.$disconnect();
  response.status(200).json(result);
};

export default createNewPeca;
