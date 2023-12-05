import { PrismaClient } from '@prisma/client';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const deleteOsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;

  const OS = await prisma.oS.delete({
    where: {
      id,
    },
  });

  if (!OS) {
    throw new HttpError(404, 'Not found');
  }

  console.log({OS})

  await prisma.$disconnect();
  response.status(204).json({OS});
};

export default deleteOsHandler;
