import { PrismaClient } from '@prisma/client';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const deleteLaserOfCustomerHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;

  console.log({id});

  const laserOfCustomer = await prisma.laserOfCustomer.delete({
    where: {
      id,
    },
  });

  if (!laserOfCustomer) {
    throw new HttpError(404, 'Not found');
  }

  console.log({laserOfCustomer})

  await prisma.$disconnect();
  response.status(204).json({laserOfCustomer});
};

export default deleteLaserOfCustomerHandler;
