import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getPecasByLaserId: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  
  const { id } = request.params;

  const pecas = await prisma.pecas.findMany({
    where: {
      laser_id: id,
    },
  });

  if (pecas === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json(pecas);
};

export default getPecasByLaserId;
