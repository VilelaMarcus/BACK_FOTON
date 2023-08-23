import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';

const userDetailsHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findMany();

  if (user === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json({
    user: {
      ...user,
      isMe: true,
    },
  });
};

export default userDetailsHandler;
