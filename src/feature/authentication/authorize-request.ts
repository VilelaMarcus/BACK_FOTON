import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';

import { AUTH0_AUDIENCE, AUTH0_DOMAIN } from '../../utils/config';

const authorizeRequest = jwt({
  secret: expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 25,
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: AUTH0_AUDIENCE,
  issuer: `https://${AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
});

export { authorizeRequest };
