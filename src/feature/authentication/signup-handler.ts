import { PrismaClient } from '@prisma/client';
import { AuthenticationClient } from 'auth0';

import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from '../../utils/config';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';
import { getCompanyType } from './authentication-helpers';

const signupHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { name, role, email, password, companyName, companyType } =
    request.body;

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists !== null) {
    throw new HttpError(422, 'Email is already in use');
  }

  const companyExists = await prisma.company.findUnique({
    where: { name: companyName },
  });

  if (companyExists !== null) {
    throw new HttpError(422, 'Company name is already in use');
  }

  const auth0 = new AuthenticationClient({
    domain: AUTH0_DOMAIN as string,
    clientId: AUTH0_CLIENT_ID,
  });

  const createUserResponse = await auth0.database?.signUp({
    email,
    password,
    ...(name && { name }),
    connection: 'Username-Password-Authentication',
    user_metadata: {
      type: companyType,
      groupName: companyName,
      ...(role && { role }),
    },
  });

  await prisma.company.create({
    data: {
      name: companyName,
      type: getCompanyType(companyType),
      users: {
        create: [
          {
            id: createUserResponse?._id as string,
            type: 'USER',
            email,
            ...(name && { name }),
            ...(role && { role }),
          },
        ],
      },
    },
  });

  await prisma.$disconnect();
  response.status(201).json({ message: 'user created' });
};

export default signupHandler;
