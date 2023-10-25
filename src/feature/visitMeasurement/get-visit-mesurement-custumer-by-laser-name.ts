import { PrismaClient } from '@prisma/client';

import { HttpError } from '../../utils/errors';
import { ApiHandler, VisitMeasurementItem } from '../../utils/types';




const getVisitMeasurmentCustumerByLaserNameHandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();
  
  const { name } = request.params;

  const laser = await prisma.laser.findUnique({
    where: {
      laser_name: name,
    },
  });

  const id = laser?.id || '';


  const visitMeasurement = await prisma.$queryRaw<VisitMeasurementItem[]>`
  SELECT *
    FROM public."LaserOfCustomer" loc
    JOIN public."Customer" c ON loc.customer_id = c.id
    JOIN public."Laser" l ON loc.laser_id = l.id
    JOIN public."CustomerVisitMeasurement" m ON loc.id = m.laser_of_customer_id
        WHERE l.id = ${id};
`;

const groupedData = visitMeasurement.reduce<{ [key: string]: VisitMeasurementItem }>((groups, item) => {
  const groupId = item.laser_of_customer_id;
  const currentDate = new Date(item.date.split('/').reverse().join('/')); // Convert to Date
  const existingDate = groups[groupId] ? new Date(groups[groupId].date.split('/').reverse().join('/')) : '';

  if (!groups[groupId] || currentDate > existingDate) {
    groups[groupId] = item;
  }
  return groups;
}, {});

// Convert the grouped data object back to an array
const filteredArray = Object.values(groupedData);


console.log({visitMeasurement})
console.log({filteredArray});

  if (visitMeasurement === null) {
    throw new HttpError(404, 'Not found');
  }


  await prisma.$disconnect();
  response.status(200).json({
    visitMeasurement: filteredArray,
    name,
  });
};

export default getVisitMeasurmentCustumerByLaserNameHandler;
