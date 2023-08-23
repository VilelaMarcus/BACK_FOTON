import { Validators } from '../../middleware/with-validation';

export const signupSchema: Validators = {
  POST: {
    email: {
      in: ['body'],
      isEmail: {
        errorMessage: 'email is invalid',
      },
      notEmpty: {
        errorMessage: 'email is required',
      },
      trim: true,
    },
    password: {
      in: ['body'],
      isLength: {
        errorMessage: 'password must be at least 8 characters',
        options: {
          min: 8,
        },
      },
      isStrongPassword: {
        options: {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        },
        errorMessage:
          'password must contain at least one lowercase, uppercase, number and symbol',
      },
    },

    name: {
      in: ['body'],
      optional: true,
      trim: true,
    },
    role: {
      in: ['body'],
      optional: true,
      trim: true,
    },
    companyType: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'company type is required',
      },
      isIn: {
        errorMessage: 'company type must be a startup, corporate or incubator',
        options: [['startup', 'corporate', 'incubator']],
      },
      trim: true,
    },
    companyName: {
      in: ['body'],
      errorMessage: 'company name should be between 3 to 50 characters',
      isLength: {
        options: { min: 3, max: 50 },
      },
      trim: true,
    },
  },
};

export const onboardingSchema: Validators = {
  POST: {
    name: {
      in: ['body'],
      isLength: {
        options: { min: 1, max: 100 },
        errorMessage:
          'name should be at least 3 chars long and maximum of 100 chars',
      },
      trim: true,
      optional: true,
    },
    role: {
      in: ['body'],
      isLength: {
        options: { min: 1, max: 100 },
        errorMessage: 'role should be between 3 to 50 characters',
      },
      trim: true,
      optional: true,
    },
    companyType: {
      in: ['body'],
      notEmpty: {
        errorMessage: 'company type is required',
      },
      isIn: {
        errorMessage: 'company type must be a startup, corporate or incubator',
        options: [['startup', 'corporate', 'incubator']],
      },
      trim: true,
    },
    companyName: {
      in: ['body'],
      errorMessage: 'company name should be between 3 to 50 characters',
      isLength: {
        options: { min: 3, max: 50 },
      },
      trim: true,
    },
  },
};
