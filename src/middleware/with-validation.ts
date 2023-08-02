import { Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';

import { HttpError } from '../utils/errors';

export type Validators = {
  [K: string]: Schema;
};

const withValidation = (schemas: Validators) => {
  return async ({
    request,
    response,
  }: {
    request: Request;
    response: Response;
  }) => {
    if (response.headersSent) {
      return { request, response };
    }

    const { method } = request;

    if (method) {
      // get schema for respective method
      const validator = checkSchema(schemas[method] ?? {});
      await Promise.all(validator.map(validation => validation.run(request)));

      const errors = validationResult(request);

      if (errors.isEmpty()) {
        return { request, response };
      }

      const extractedErrors = errors.array();

      throw new HttpError(422, extractedErrors[0].msg);
    }

    return { request, response };
  };
};

export default withValidation;
