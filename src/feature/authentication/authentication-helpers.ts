import { CompanyType } from '@prisma/client';

export const getCompanyType = (type: string) => {
  switch (type) {
    case 'corporate':
      return CompanyType.CORPORATE;
    case 'startup':
      return CompanyType.STARTUP;
    case 'incubator':
      return CompanyType.INCUBATOR;
    default:
      return CompanyType.STARTUP;
  }
};
