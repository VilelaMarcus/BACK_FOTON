import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler, VisitMeasurementItem } from '../../utils/types';


const getDashboadInfo: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
 
  const visitMeasurements = await prisma.$queryRaw<VisitMeasurementItem[]>`
  SELECT *
    FROM public."LaserOfCustomer" loc
    JOIN public."Customer" c ON loc.customer_id = c.id
    JOIN public."Laser" l ON loc.laser_id = l.id
    JOIN public."CustomerVisitMeasurement" m ON loc.id = m.laser_of_customer_id;
`;

  const sortedVisits = visitMeasurements
  .filter(visit => visit.date !== null && visit.date !== "")
  .sort((a, b) => {
    const parseDate = (dateStr: string) => {
      const [day, month, year] = dateStr.split('/');
      return new Date(`${year}-${month}-${day}`);
    };

    const dateA = parseDate(a.date!);
    const dateB = parseDate(b.date!);

    return dateB.getTime() - dateA.getTime();
  });

  const last10Visits = sortedVisits.slice(0, 10);
  
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonthLastDate = new Date(today.getFullYear(), today.getMonth(), 0);
  const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
  const currentMonthVisits = sortedVisits
    .filter(visit => visit.date !== null)
    .filter(visit => {
      const [day, month, year] = visit.date!.split('/').map(Number);
      const visitDate = new Date(year, month - 1, day); // Month is zero-based in JavaScript Dates
      return visitDate >= firstDayOfMonth && visitDate <= today;
    });
  
  const lastMonthVisits = sortedVisits
    .filter(visit => visit.date !== null)
    .filter(visit => {
      const [day, month, year] = visit.date!.split('/').map(Number);
      const visitDate = new Date(year, month - 1, day); // Month is zero-based in JavaScript Dates
      return visitDate >= firstDayOfLastMonth && visitDate <= lastMonthLastDate;
    });
  
  const currentMonthVisitCount = currentMonthVisits.length;
  const lastMonthVisitCount = lastMonthVisits.length;

  if (visitMeasurements === null) {
    throw new HttpError(404, 'Not found');
  }

  // Calculate visits per technician
  const visitsPerTechnician = visitMeasurements.reduce((acc, visit) => {
    const tecnic = visit.tecnic; // Assuming the property is 'tecnic_name'
    acc[tecnic] = (acc[tecnic] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dashboardInfo = {
    last10Visits: sortedVisits.slice(0, 10),
    currentMonthVisitCount,
    lastMonthVisitCount,
    visitsPerTechnician: Object.entries(visitsPerTechnician).map(([tecnic, visits]) => ({
      tecnic,
      visits,
    })),
  };

  console.log({visitsPerTechnician});

  await prisma.$disconnect();
  response.status(200).json(dashboardInfo);
};

export default getDashboadInfo;
