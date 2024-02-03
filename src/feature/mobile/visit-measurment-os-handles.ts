import { PrismaClient } from '@prisma/client';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';
import nodemailer, { SendMailOptions } from 'nodemailer';
import generateStyledPDF from '../../utils/generate-pdf';


type LaserOfCustomer = {
    id: string;
    laser_id: string;
    customer_id: string;
    address: string;
    customer_name: string;
    city: string;
    zip_code: string;
    laser_name: string;
    brand: string;
    owner:string;
    email:string;
}


const createNewVisitByOShandler: ApiHandler = async ({ request, response }) => {
    
    const prisma = new PrismaClient();

    const { laser_of_customer_id, os : osResponses, signature, tecnic_name } = request.body;

    if (!laser_of_customer_id) {
        throw new HttpError(404, 'Not found');
    }

    const LaserOfCustomer = await prisma.$queryRaw<LaserOfCustomer[]>`
    SELECT loc.*, l.*, c.*
    FROM public."LaserOfCustomer" loc
    JOIN public."Laser" l ON loc.laser_id = l.id
    JOIN public."Customer" c ON loc.customer_id = c.id
    WHERE loc.id = ${laser_of_customer_id};
  `;


  const OS = await prisma.oS.findMany({
    where: {
      laser_id: LaserOfCustomer[0].laser_id,
    },
  });

  const bodyContent = OS
    .filter((step) => osResponses.hasOwnProperty(step.id))
    .map((step) => ({
        id: step.id,
        description: step.description,
        value: osResponses[step.id],
    }));

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString('pt-BR', options);

    const maxLength = 40;
    const truncatedAddress = LaserOfCustomer[0].address.substring(0, maxLength);
        
    const tableContent = [
        [date, `"Físico de campo: ${tecnic_name}`],
        [`Equipamento: ${LaserOfCustomer[0].laser_name}`, "S/N: ----------"],
        [`Local: ${truncatedAddress}`, `Cliente:  ${LaserOfCustomer[0].owner}`],
    ];

    const header = 'Relatório de Visita';
    const footer = 'Rua Emilio de Menezes 226, Bairro Santa Maria Belo Horizonte – MG CEP 30525-200 - Telefone: (31)3388-2612';
    // Generate PDF
    const pdfBuffer = await generateStyledPDF(tableContent, footer, bodyContent, signature);

    // Send email with PDF attachment
    await sendEmailWithAttachment('vilelamarcusvinicius@gmail.com,' + LaserOfCustomer[0].email, 'OS Teste', pdfBuffer);

  await prisma.$disconnect();
  response.status(200).json();
};

async function sendEmailWithAttachment(recipientEmail: string, subject: string, pdfBuffer: Uint8Array) {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'marcusvilela25@gmail.com',
        pass: 'dbcp ttfb oayk delh',
        },
    });
    const mailOptions: SendMailOptions = {
        from: 'marcusvilela25@gmail.com',
        to: recipientEmail,
        subject: subject,
        text: 'PDF Attachment',
        attachments: [
            {
                filename: 'document.pdf',
                content: Buffer.from(pdfBuffer), // Convert Uint8Array to Buffer
            },
        ],
    };

    await transporter.sendMail(mailOptions);
}

export default createNewVisitByOShandler;