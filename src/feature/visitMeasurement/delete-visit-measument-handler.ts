import { PrismaClient } from '@prisma/client';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const deleteVisitCustomerMeasurement: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { id } = request.params;

  console.log({id});

  const visitMeasurement = await prisma.customerVisitMeasurement.delete({
    where: {
      id,
    },
  });

  if (!visitMeasurement) {
    throw new HttpError(404, 'Not found');
  }

  console.log({visitMeasurement})

  await prisma.$disconnect();
  response.status(204).json({visitMeasurement});
};

export default deleteVisitCustomerMeasurement;
