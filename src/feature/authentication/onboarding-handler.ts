import { PrismaClient } from '@prisma/client';
import { ManagementClient } from 'auth0';

import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
} from '../../utils/config';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';
import { getCompanyType } from './authentication-helpers';
import { TokenPayload } from './authentication-types';

const onboardingHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { sub } = request.user as TokenPayload;
  const userId = sub.split('|')[1];

  const { name, role, companyName, companyType } = request.body;

  const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (userExists !== null) {
    throw new HttpError(422, 'User already onboarded');
  }

  const companyExists = await prisma.company.findUnique({
    where: { name: companyName },
  });

  if (companyExists !== null) {
    throw new HttpError(422, 'Company name is already in use');
  }

  const auth0 = new ManagementClient({
    domain: AUTH0_DOMAIN as string,
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
  });

  const updateUserResponse = await auth0.updateUser(
    // { id: `auth0|${userId}` },
    { id: sub },
    {
      ...(name && { name }),
      user_metadata: {
        type: companyType,
        groupName: companyName,
        ...(role && { role }),
      },
    },
  );

  if (updateUserResponse) {
    const id = updateUserResponse?.user_id?.split('|')[1];
    await prisma.company.create({
      data: {
        name: companyName,
        type: getCompanyType(companyType),
        users: {
          create: [
            {
              id,
              type: 'USER',
              email: updateUserResponse.email,
              ...(name && { name }),
              ...(role && { role }),
            },
          ],
        },
      },
    });
  }

  await prisma.$disconnect();
  response.status(201).json({ message: 'user onboarded' });
};

export default onboardingHandler;
