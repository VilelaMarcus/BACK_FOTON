import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const createOsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { 
    id,  
    custumer_name,  
    owner,  
    email, 
    logoUrl, 
    address, 
    city, 
    zip_code,
  } = request.body || '';

  if (!id) {
    throw new HttpError(404, 'Not found');
  }


  const data = {
    ...(id && { id }),                 
    ...(owner && { owner }),          
    ...(email && { email }),          
    ...(address && { address }),                   
  };

  const result = await prisma.customer.create({
    data: data,
  });


 await prisma.$disconnect();
  response.status(200).json(result);
};

export default createOsHandler;
