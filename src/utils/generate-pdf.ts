import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import axios from 'axios';
import { ReportData, EquipmentData } from './types';

interface BodyItem {
  description: string;
  value: string;
}

async function generateStyledPDF(
  reportData: ReportData,
  equipmentData: EquipmentData,
  footer: string,
  previousSituations: string,
  bodyData: BodyItem[],
  tecnicName: string,
  signature: string,
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 dimensions in points
    const { width, height } = page.getSize();
        
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const FistName = tecnicName.split(' ')[0];
    // Fetch the logo image
    const response = await axios.get('https://foton-buket.s3.amazonaws.com/logo.png', { responseType: 'arraybuffer' });
    const imageBuffer: Buffer = Buffer.from(response.data, 'binary');
    const logoImage = await pdfDoc.embedJpg(imageBuffer);

    // Draw the superior line
    const lineHeight = 14.17; // 0.5 cm in points
    const lineY = height - 28.34; // 0.5 cm from the top

    page.drawRectangle({
        x: 28.34, // 0.5 cm from the left
        y: lineY,
        width: width - 56.68, // width minus 1 cm (0.5 cm each side)
        height: lineHeight,
        color: rgb(0.043, 0.325, 0.58), // #0b5394
    });

    // Draw the header table with logo and title
    const headerMargin = 42.52; // 1.5 cm margin on each side
    const headerTableY = lineY - 14.17 - 75; // 0.5 cm below the line and 75 points height for the header
    const headerTableHeight = 75;
    const headerTableWidth = width - 2 * headerMargin;

    // Draw the header box
    page.drawRectangle({
        x: headerMargin, // 1.5 cm from the left
        y: headerTableY,
        width: headerTableWidth,
        height: headerTableHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    // Draw the logo box
    const logoBoxX = headerMargin; // Start at the left margin
    const logoBoxY = headerTableY + 1;
    const logoBoxWidth = (headerTableWidth / 2) - 1; // Half width minus 1 point for the border
    const logoBoxHeight = headerTableHeight - 2;

    page.drawRectangle({
        x: logoBoxX,
        y: logoBoxY,
        width: logoBoxWidth,
        height: logoBoxHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    // Draw the logo inside the logo box
    const logoPadding = 5;
    page.drawImage(logoImage, {
        x: logoBoxX + logoPadding,
        y: logoBoxY + logoPadding,
        width: logoBoxWidth - 2 * logoPadding,
        height: logoBoxHeight - 2 * logoPadding,
    });

    // Draw the title box
    const titleBoxX = logoBoxX + logoBoxWidth + 1; // Next to the logo box
    const titleBoxY = logoBoxY;
    const titleBoxWidth = logoBoxWidth; // Same width as logo box

    page.drawRectangle({
        x: titleBoxX,
        y: titleBoxY,
        width: titleBoxWidth,
        height: logoBoxHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    // Draw the title inside the title box
    const titleText = 'Laudo Técnico';
    const titleTextWidth = font.widthOfTextAtSize(titleText, 14);
    const titleTextX = titleBoxX + (titleBoxWidth - titleTextWidth) / 2;
    const titleTextY = titleBoxY + (logoBoxHeight / 2) - 10;

    page.drawText(titleText, {
        x: titleTextX,
        y: titleTextY,
        font,
        size: 14,
        color: rgb(0, 0, 0),
    });

  // Draw the table with report data
  const tableStartY = headerTableY - 75 - 56.68; // 2 cm below the header
  const tableMargin = 52.52; // 1.5 cm margin on each side
  const tableWidth = width - 2 * tableMargin - 10;
  const tableHeight = 90; // Adjust as necessary (3 rows)

    page.drawRectangle({
        x: tableMargin,
        y: tableStartY,
        width: tableWidth,
        height: tableHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    // Draw lines separating rows
    const rowHeight = tableHeight / 3;
    for (let i = 1; i < 3; i++) {
        const lineY = tableStartY + i * rowHeight;
        page.drawLine({
        start: { x: tableMargin, y: lineY },
        end: { x: tableMargin + tableWidth, y: lineY },
        thickness: 1,
        color: rgb(0, 0, 0),
        });
    }

    // Draw lines separating columns
    const columnWidth = tableWidth / 2;
    page.drawLine({
        start: { x: tableMargin + columnWidth, y: tableStartY },
        end: { x: tableMargin + columnWidth, y: tableStartY + tableHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
    });

    // Draw text in the table cells
    const cellPadding = 10;
    const cellTextOptions = {
    font,
    size: 12,
    color: rgb(0, 0, 0),
    };

    const boldTextOptions = {
    font: boldFont,
    size: 12,
    color: rgb(0, 0, 0),
    };

    const labels = [
    ['Cliente:', 'CNPJ:'],
    ['Endereço:', 'Contato:'],
    ['Técnico Executor:', 'Data da Inspeção:']
    ];

    const values = [
    [reportData.client, reportData.cnpj],
    [reportData.address, reportData.contact],
    [reportData.technician, reportData.inspectionDate]
    ];

    labels.forEach((labelRow, rowIndex) => {
    const textY = tableStartY + tableHeight - (rowIndex + 1) * rowHeight + cellPadding;

    // Draw labels with bold font
    page.drawText(labelRow[0], {
        x: tableMargin + cellPadding,
        y: textY,
        ...boldTextOptions
    });
    page.drawText(values[rowIndex][0], {
        x: tableMargin + columnWidth / 2,
        y: textY,
        ...cellTextOptions
    });

    page.drawText(labelRow[1], {
        x: tableMargin + columnWidth + cellPadding,
        y: textY,
        ...boldTextOptions
    });
    page.drawText(values[rowIndex][1], {
        x: tableMargin + columnWidth + columnWidth / 2,
        y: textY,
        ...cellTextOptions
    });
    });

    // Draw centered text 2 cm below the table
    const centeredTextY = tableStartY - 30.68; // 2 cm below the table
    const centeredText = "Laudo de manutenção preventiva e inspeção técnica para equipamentos eletromédicos:";
    const centeredTextWidth = font.widthOfTextAtSize(centeredText, 12);
    const centeredTextX = (width - centeredTextWidth) / 2;

    page.drawText(centeredText, {
        x: centeredTextX,
        y: centeredTextY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
    });

    // Draw the equipment table 2 cm below the centered text
    const equipmentTableStartY = centeredTextY - 56.68; // 2 cm below the centered text
    const equipmentTableHeight = 40; // Adjust as necessary (2 rows)
    const equipmentColumnWidth = tableWidth / 3;

    page.drawRectangle({
        x: tableMargin,
        y: equipmentTableStartY,
        width: tableWidth,
        height: equipmentTableHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    // Draw lines separating rows
    const equipmentRowHeight = equipmentTableHeight / 2;
    page.drawLine({
        start: { x: tableMargin, y: equipmentTableStartY + equipmentRowHeight },
        end: { x: tableMargin + tableWidth, y: equipmentTableStartY + equipmentRowHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
    });

    // Draw lines separating columns
    for (let i = 1; i < 3; i++) {
        page.drawLine({
        start: { x: tableMargin + i * equipmentColumnWidth, y: equipmentTableStartY },
        end: { x: tableMargin + i * equipmentColumnWidth, y: equipmentTableStartY + equipmentTableHeight },
        thickness: 1,
        color: rgb(0, 0, 0),
        });
    }

    // Draw text in the equipment table cells
    const equipmentLabels = ['Equipamento', 'Fabricante', 'Número de Série'];
    const equipmentValues = [equipmentData.equipment, equipmentData.manufacturer, equipmentData.serialNumber];

    equipmentLabels.forEach((label, columnIndex) => {
        page.drawText(label, {
        x: tableMargin + columnIndex * equipmentColumnWidth + cellPadding,
        y: equipmentTableStartY + equipmentTableHeight - equipmentRowHeight + cellPadding - 3,
        font: boldFont,
        size: 12,
        color: rgb(0, 0, 0),
        });

        page.drawText(equipmentValues[columnIndex], {
        x: tableMargin + columnIndex * equipmentColumnWidth + cellPadding,
        y: equipmentTableStartY + cellPadding -3,
        font,
        size: 12,
        color: rgb(0, 0, 0),
        });
    });

    // Draw text "Abaixo a relação dos serviços executados:" 2 cm below the equipment table
    const servicesTextY = equipmentTableStartY - 36.68; // 2 cm below the equipment table
    const servicesText = "Abaixo a relação dos serviços executados:";
    const servicesTextX = tableMargin;

    page.drawText(servicesText, {
        x: servicesTextX,
        y: servicesTextY,
        font,
        size: 12,
        color: rgb(0, 0, 0),
    });

    // Calculate the initial Y position for the services table
    const servicesTableStartY = servicesTextY - 20.68; // 2 cm below the services text

    // Calculate the height of the services table dynamically based on bodyData length
    const rowCount = bodyData.length + 1; // +1 for header row
    const servicesTableHeight = rowCount * 20 + 5; // Adjust as necessary

    // Define column widths
    const firstColumnWidth = (tableWidth / 3) - 24.34; // 1 cm less from each side
    const middleColumnWidth = (tableWidth / 3) + 50.68; // 2 cm more
    const lastColumnWidth = (tableWidth / 3) - 30.34; // 1 cm less from each side

    // Draw rectangle for services table
    page.drawRectangle({
        x: tableMargin,
        y: servicesTableStartY - servicesTableHeight, // Adjusted to grow downwards
        width: tableWidth,
        height: servicesTableHeight,
        borderColor: rgb(0, 0, 0),
        borderWidth: 1,
    });

    // Draw lines separating columns
    const columnWidths = [firstColumnWidth, middleColumnWidth, lastColumnWidth];
    let currentX = tableMargin;
    columnWidths.forEach((columnWidth, i) => {
        if (i > 0) {
            page.drawLine({
                start: { x: currentX, y: servicesTableStartY - servicesTableHeight },
                end: { x: currentX, y: servicesTableStartY },
                thickness: 1,
                color: rgb(0, 0, 0),
            });
        }
        currentX += columnWidth;
    });

    // Draw headers in the services table
    const headers = ['Serviços Executados', '', 'Valor Total: R$ XX,xx'];
    currentX = tableMargin;
    headers.forEach((header, columnIndex) => {
        let headerY = servicesTableStartY - servicesTableHeight + (servicesTableHeight / 2) - 6; // Centered vertically
        page.drawText(header, {
            x: currentX + cellPadding,
            y: headerY,
            font: boldFont,
            size: 12,
            color: rgb(0, 0, 0),
        });
        currentX += columnWidths[columnIndex];
    });

    // Draw bodyData items in the second column with bullet points, without drawing row lines
    const bodyStartY = servicesTableStartY - servicesTableHeight + servicesTableHeight - 20; // Start drawing 20 points below the header

    bodyData.forEach((item, rowIndex) => {
        const bullet = '• ';
        page.drawText(bullet + item.description, {
            x: tableMargin + firstColumnWidth + cellPadding,
            y: bodyStartY - rowIndex * 12, // Adjusted font size
            font,
            size: 10, // Smaller font size
            color: rgb(0, 0, 0),
        });
    });

    // Draw text after services table
    const disclaimerText = `Declaramos para os devidos fins, que o(s) equipamento(s) eletromédico(s)citado(s) acima,\nestá(estão) em conformidadede funcionamento, de acordo com a revisão realizada pela empresa\nFóton Tecnologia LTDA, inscrita no CNPJ: 04.084.772/0001-00.`;
    const responsibleText = `Responsável técnico: ${tecnicName}`;

    // Calculate positions
    const disclaimerTextY = servicesTableStartY - servicesTableHeight - 26.68; // 1 cm below the services table
    const responsibleTextY = disclaimerTextY - 58.34; // 1 cm below the disclaimer text

   // Draw disclaimer text
    page.drawText(disclaimerText, {
        x: tableMargin,
        y: disclaimerTextY,
        font,
        size: 10, // Smaller font size
        color: rgb(0, 0, 0),
        lineHeight: 13, // Adjust line height as needed
    });

    // Draw responsible text
    page.drawText(responsibleText, {
        x: tableMargin,
        y: responsibleTextY,
        font,
        size: 10, // Smaller font size
        color: rgb(0, 0, 0),
    });

    const bottomMargin = 28.34; // 1 cm from the bottom

    page.drawRectangle({
        x: 28.34, // 0.5 cm from the left
        y: bottomMargin,
        width: width - 56.68, // width minus 1 cm (0.5 cm each side)
        height: lineHeight,
        color: rgb(0.043, 0.325, 0.58), // #0b5394
    });

    page.drawText(footer, { x: 50, y: bottomMargin + 20, font, size: 10, color: rgb(0, 0, 0) });

    // Position the signatures just above the blue line
    const textY = bottomMargin + 130; // 1 cm above the blue line
    const imageY = textY - 60; // Adjust as needed
    const imageHeight = 50; // Adjust as needed

    // Draw the text for the signatures
    const clinicSignatureText = 'Assinatura do responsável da Clínica:';
    const tecnicSignatureText = 'Assinatura do Técnico:';

    const clinicTextWidth = font.widthOfTextAtSize(clinicSignatureText, 12);
    const tecnicTextWidth = font.widthOfTextAtSize(tecnicSignatureText, 12);

    const clinicTextX = (tableWidth / 4) - (clinicTextWidth / 2) + tableMargin;
    const tecnicTextX = (3 * tableWidth / 4) - (tecnicTextWidth / 2) + tableMargin;

    page.drawText(clinicSignatureText, { x: clinicTextX, y: textY, font, size: 12, color: rgb(0, 0, 0) });
    page.drawText(tecnicSignatureText, { x: tecnicTextX, y: textY, font, size: 12, color: rgb(0, 0, 0) });

    // Draw the clinic signature image if available
    if (signature) {
        const base64Data = signature.split(",")[1];
        const signatureImageBuffer = Buffer.from(base64Data, 'base64');
        const pngImage = await pdfDoc.embedPng(signatureImageBuffer);

        const clinicImageWidth = 100; // Adjust as needed
        const clinicImageX = clinicTextX + (clinicTextWidth / 2) - (clinicImageWidth / 2);

        page.drawImage(pngImage, { x: clinicImageX, y: imageY, width: clinicImageWidth, height: imageHeight });
    }

    // Fetch and draw the technical signature image from AWS
    try {
        const assinatura = await axios.get(`https://foton-buket.s3.amazonaws.com/${FistName}.png`, { responseType: 'arraybuffer' });
        const signatureBuffer: Buffer = Buffer.from(assinatura.data, 'binary');
        const signatureImage = await pdfDoc.embedPng(signatureBuffer);

        const tecnicImageWidth = 100; // Adjust as needed
        const tecnicImageX = tecnicTextX + (tecnicTextWidth / 2) - (tecnicImageWidth / 2);


        page.drawImage(signatureImage, {
            x: tecnicImageX,
            y: imageY,
            width: tecnicImageWidth,
            height: imageHeight,
        });

    } catch (error) {
        console.error('Error fetching technical signature image:', error);
    }

    // Return the saved PDF document
    return pdfDoc.save();

}

export default generateStyledPDF;