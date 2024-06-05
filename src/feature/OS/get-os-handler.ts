

import prismaClient from '../../prismaClient';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const getOsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = await prismaClient.getInstance();

  const OS = await prisma.oS.findMany();
  
  if (OS === null) {
    throw new HttpError(404, 'Not found');
  }

  response.status(200).json(OS);
};

export default getOsHandler;
