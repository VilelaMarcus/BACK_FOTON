import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getLaserHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  
  const lasers = await prisma.laser.findMany();

  if (lasers === null) {
    throw new HttpError(404, 'Not found');
  }

  await prisma.$disconnect();
  response.status(200).json(lasers);
};

export default getLaserHandler;