import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getOsByLaserId: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  
  const { id } = request.params;

  const OS = await prisma.oS.findMany({
    where: {
      laser_id: id,
    },
  });

  if (OS === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json(OS);
};

export default getOsByLaserId;
