import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import jimp from 'jimp';
import axios from 'axios';

import path from 'path';

interface Item {
  id: string;
  description: string;
  value: string;
}

interface BodyItem {
  description: string;
  value: string;
}

interface TableItem {
    data: string;
}


async function generateStyledPDF(
    tableContent: string[][],
    footer: string,
    bodyData: BodyItem[],    
    signature: string,
):Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
     // Fetch the image
    const response = await axios.get('https://foton-buket.s3.amazonaws.com/logo.png', { responseType: 'arraybuffer' });
    
    // Convert the image to a buffer
    const imageBuffer: Buffer = Buffer.from(response.data, 'binary');

    // Embed the image in the PDF using pdf-lib's built-in image loading
    const logoImage = await pdfDoc.embedJpg(imageBuffer);


    const logoX = (width - 220) / 2;
    const logoY = height - 75;

    page.drawImage(logoImage, {
        x: logoX,
        y: logoY,
        width: 200,
        height: 75,
    });

    
    // Draw title for the header table
    const titleY = logoY - 40;
    page.drawText('Relatório de Serviços', { x: (width - 150) / 2, y: titleY, font, size: 14, color: rgb(0, 0, 0) });
    
    
    // Draw header table
    const headerTableY = titleY - 30;
    const cellWidth = (width - 100) / 2;
    const headerBoxHeight = 3 * 30; // Adjust the box height based on the number of rows

    
    page.drawLine({
        start: { x: 50, y: headerTableY },
        end: { x: width - 50, y: headerTableY },
        thickness: 1,
        color: rgb(0, 0, 0),
        });
    
        page.drawLine({
        start: { x: 50, y: headerTableY },
        end: { x: 50, y: headerTableY - headerBoxHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
        });
    
        page.drawLine({
        start: { x: width - 50, y: headerTableY },
        end: { x: width - 50, y: headerTableY - headerBoxHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
        });
    
        page.drawLine({
        start: { x: 50, y: headerTableY - headerBoxHeight },
        end: { x: width - 50, y: headerTableY - headerBoxHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
        });   


    
    // Draw lines in the middle dividing the columns
    const columnDividerX = 60 + cellWidth;    
    // Draw lines for each row and in the middle dividing the columns
    for (let i = 0; i <= tableContent.length; i++) {
        const rowY = headerTableY - i * 30;

        // Draw line for each row
        page.drawLine({
            start: { x: 50, y: rowY },
            end: { x: width - 50, y: rowY },
            thickness: 1,
            color: rgb(0, 0, 0),
        });

        page.drawLine({
            start: { x: columnDividerX, y: headerTableY },
            end: { x: columnDividerX, y: rowY },
            thickness: 1,
            color: rgb(0, 0, 0),
        });
    }

    for (let i = 0; i < tableContent.length; i++) {
        const rowY = headerTableY - i * 30;
        // Draw text for each column above the line
        const textY = rowY - 15;
        page.drawText(tableContent[i][0], { x: 60, y: textY, font, size: 10, color: rgb(0, 0, 0) });
        page.drawText(tableContent[i][1], { x: columnDividerX + 10, y: textY, font, size: 10, color: rgb(0, 0, 0) });
    }

    // Draw body data in a single row inside a larger box
    const bodyTableY = headerTableY - headerBoxHeight - 20;
    const bodyTableHeight = 20 * (bodyData.length + 2); // Add an extra row for the title

    page.drawLine({
    start: { x: 50, y: bodyTableY },
    end: { x: width - 50, y: bodyTableY },
    thickness: 1,
    color: rgb(0, 0, 0),
    });

    page.drawLine({
    start: { x: 50, y: bodyTableY },
    end: { x: 50, y: bodyTableY - bodyTableHeight },
    thickness: 1,
    color: rgb(0, 0, 0),
    });

    page.drawLine({
    start: { x: width - 50, y: bodyTableY },
    end: { x: width - 50, y: bodyTableY - bodyTableHeight },
    thickness: 1,
    color: rgb(0, 0, 0),
    });

    page.drawLine({
    start: { x: 50, y: bodyTableY - bodyTableHeight },
    end: { x: width - 50, y: bodyTableY - bodyTableHeight },
    thickness: 1,
    color: rgb(0, 0, 0),
    });

    const titleBody = bodyTableY - 20; // Adjust the padding here

    // Calculate the width of the text
    const bodyDataTitleWidth = font.widthOfTextAtSize('Serviço Realizado', 20);

    // Calculate the x-coordinate for the centered text
    const bodyDataTitleX = (width - bodyDataTitleWidth) / 2;

    // Draw the body data title
    page.drawText('Serviço Realizado', { x: bodyDataTitleX, y: titleBody, size: 12, font, color: rgb(0, 0, 0) });

    for (let i = 0; i < bodyData.length; i++) {
        const rowY = titleBody - (i + 1) * 20;
        page.drawText('- ' + bodyData[i].description + ': ' + bodyData[i].value, { x: 70, y: rowY, font, size: 10, color: rgb(0, 0, 0) });
    }

    // Calculate the x-coordinate for the signature text
    const textWidth = font.widthOfTextAtSize('Assinatura do responsavel da Clínica:', 12);
    const textX = (width - textWidth) / 2;
    page.drawText('Assinatura do responsavel da Clínica:', { x: textX, y: 170, font, size: 12, color: rgb(0, 0, 0) });

    // Calculate the x-coordinate for the signature image
    const imageWidth = 250; // The width of the signature image
    const imageX = (width - imageWidth) / 2;
    const base64Data = signature.split(",")[1];
    const signatureImageBuffer = Buffer.from(base64Data, 'base64');
    const pngImage = await pdfDoc.embedPng(signatureImageBuffer);
    

    // Draw the signature image on top of the shadow rectangle
    page.drawImage(pngImage, { x: imageX, y: 31, width: imageWidth, height: 125 });

    // Draw footer
    const footerY = 30;
    page.drawText(footer, { x: 50, y: footerY, font, size: 10, color: rgb(0, 0, 0) });

    return pdfDoc.save();
}

export default generateStyledPDF;