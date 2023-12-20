import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const createNewEquipment: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { 
    id,  
    laser_name,
    brand,
  } = request.body || '';

  if (!id) {
    throw new HttpError(404, 'Not found');
  }

  console.log(request.body);


  const data = {
    ...(id && { id }),                    
    ...(laser_name && { laser_name }),                   
    ...(brand && { brand }),                   
  };

  const result = await prisma.laser.create({
    data: data,
  });


 await prisma.$disconnect();
  response.status(200).json(result);
};

export default createNewEquipment;
