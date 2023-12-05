import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const createOsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { 
    id,
    laser_id,
    description,
    type,
  } = request.body || '';

  if (!id) {
    throw new HttpError(404, 'Not found');
  }


  const data = {
    ...(id && { id }),                 
    ...(laser_id && { laser_id }),          
    ...(description && { description }),          
    ...(type && { type }),                   
  };

  const result = await prisma.oS.create({
    data: data,
  });

  console.log(result);


 await prisma.$disconnect();
  response.status(200).json(result);
};

export default createOsHandler;
