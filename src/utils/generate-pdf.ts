import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import jimp from 'jimp';
import fs from 'fs/promises';
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

    const logoImagePath = path.join(__dirname, 'assets', 'logo.png');
    const logoImage = await jimp.read(logoImagePath);

    const logoX = (width - 200) / 2;
    const logoY = height - 130;

    const logoImageBuffer = await logoImage.getBufferAsync(jimp.MIME_PNG);
    const logoImageEmbed = await pdfDoc.embedPng(logoImageBuffer);



    page.drawImage(logoImageEmbed, {
        x: logoX,
        y: logoY,
        width: 200,
        height: 100,
    });

    // Draw title for the header table
    const titleY = logoY - 40;
    page.drawText('Relatório de Serviços', { x: (width - 150) / 2, y: titleY, font, size: 16, color: rgb(0, 0, 0) });
    
    
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
        page.drawText(tableContent[i][0], { x: 60, y: textY, font, size: 12, color: rgb(0, 0, 0) });
        page.drawText(tableContent[i][1], { x: columnDividerX + 10, y: textY, font, size: 12, color: rgb(0, 0, 0) });
    }

    // Draw body data in a single row inside a larger box
    const bodyTableY = headerTableY - headerBoxHeight - 30;
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

    page.drawText('Serviço Realizado', { x: 60, y: titleBody, font, size: 14, color: rgb(0, 0, 0) });

    for (let i = 0; i < bodyData.length; i++) {
        const rowY = titleBody - (i + 1) * 20;
        page.drawText(bodyData[i].description + ': ' + bodyData[i].value, { x: 70, y: rowY, font, size: 12, color: rgb(0, 0, 0) });
    }


    // Embed signature image
    const signatureImage = await jimp.read(Buffer.from(signature, 'base64'));
    const signatureWidth = 100; // Adjust the width of the signature image
    const signatureHeight = (signatureWidth / signatureImage.getWidth()) * signatureImage.getHeight();

    const signatureX = 60; // Adjust the X position of the signature image
    const signatureY = titleBody - bodyData.length * 20 - 30; // Adjust the Y position of the signature image

    const signatureImageBuffer = await signatureImage.getBufferAsync(jimp.MIME_PNG);
    const signatureImageEmbed = await pdfDoc.embedPng(signatureImageBuffer);

    page.drawImage(signatureImageEmbed, {
    x: signatureX,
    y: signatureY,
    width: signatureWidth,
    height: signatureHeight,
    });

    // Draw footer
    const footerY = 30;
    page.drawText(footer, { x: 50, y: footerY, font, size: 10, color: rgb(0, 0, 0) });

    return pdfDoc.save();
}

export default generateStyledPDF;
