import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const createNewEquipmenteToClient: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { 
    id,  
    customer_name, 
    laser_id, 
    customer_id, 
    address, 
    city, 
    zip_code,
  } = request.body || '';

  if (!id) {
    throw new HttpError(404, 'Not found');
  }

  console.log(request.body);


  const data = {
    ...(id && { id }),                
    ...(customer_name && { customer_name }),                   
    ...(laser_id && { laser_id }),                   
    ...(customer_id && { customer_id }),                   
    ...(city && { city }),                   
    ...(address && { address }),                   
    ...(zip_code && { zip_code }),                   
  };

  console.log({data})

  const result = await prisma.laserOfCustomer.create({
    data: data,
  });


 await prisma.$disconnect();
  response.status(200).json(result);
};

export default createNewEquipmenteToClient;
