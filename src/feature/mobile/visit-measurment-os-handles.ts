import { PrismaClient } from '@prisma/client';
import { HttpError } from '../../utils/errors';
import { ApiHandler } from '../../utils/types';
import nodemailer, { SendMailOptions } from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import generateStyledPDF from '../../utils/generate-pdf';
import { mockImage64 } from './assets/mockBase64';



const headerData = [
    { field: 'Data:', data: '19 de Outubro de 2021' },
    { field: 'Físico de campo:', data: 'Fábio Vilela' },
    { field: 'Equipamento:', data: 'IFS Intralase' },
    { field: 'S/N:', data: '0506-40044' },
    { field: 'Local:', data: 'Curitiba PR' },
    { field: 'Cliente:', data: 'Laserview' },
  ];

  const bodyContent =   [{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "o41234k"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "o1243k"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "o1k"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "Foi feito"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "3253245"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "52352345"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "o41234k"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "o1243k"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "o1k"
},{
    "id": "419037a8-2208-48ce-be78-db30fe3a2957",
    "description": "Conectar computador a cabeça de laser",
    "value": "ok22"
},
]


const tableContent = [
    ["Data: 19 de Outubro de 2021", "Físico de campo: Fábio Vilela"],
    ["Equipamento: IFS Intralase", "S/N: 0506-40044"],
    ["Local: Curitiba PR", "Cliente: Laserview"],
];

const createNewVisitByOShandler: ApiHandler = async ({ request, response }) => {
  const prisma = new PrismaClient();

  const { laser_of_customer_id, os } = request.body;

  if (!laser_of_customer_id) {
    throw new HttpError(404, 'Not found');
  }


  const signature = mockImage64[0];

  console.log(request.body);

  const header = 'Relatório de Visita';
  const footer = 'Rua Emilio de Menezes 226, Bairro Santa Maria Belo Horizonte – MG CEP 30525-200 - Telefone: (31)3388-2612';
  
  // Generate PDF
  const pdfBuffer = await generateStyledPDF(tableContent, footer, bodyContent, signature);

  // Send email with PDF attachment
  await sendEmailWithAttachment("marcusvilela000@gmail.com", 'OS Teste', pdfBuffer);

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
