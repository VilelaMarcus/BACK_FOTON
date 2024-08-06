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
    partData: string[],
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
    const tableMargin = 52.52; // 1.5 cm margin on each side

    const title = 'Relatório de manutenção e Laudo Técnico'
    const titleTextY = logoBoxY - 26.68; // 2 cm below the equipment table

    page.drawText(title, {
        x: tableMargin + 110,
        y: titleTextY,
        font: boldFont, // Use the bold font for the title
        size: 12,
        color: rgb(0, 0, 0),
    });



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

    const fontSize = 8;
    const titleText = `CNPJ: 04.084.772/0001-00\nRua Emílio de Meneses, 226\nBairro Santa Maria,\nBelo Horizonte MG\nCEP 30525-200\nTel.: (31) 3388-2612`;
    const titleLines = titleText.split('\n');
    const titleTextYStart = titleBoxY + logoBoxHeight - 10; // Adjust if necessary to position the first line properly

    titleLines.forEach((line, index) => {
        const titleTextWidth = font.widthOfTextAtSize(line, 14);
        const titleTextX = titleBoxX + titleBoxWidth - 105;
        const titleTextY = titleTextYStart - (index * 10);

        page.drawText(line, {
            x: titleTextX,
            y: titleTextY,
            font,
            size: fontSize,
            color: rgb(0, 0, 0),
        });
    });

  // Draw the table with report data
  const tableStartY = headerTableY - 75 - 46.68; // 2 cm below the header
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
    size: 10,
    color: rgb(0, 0, 0),
    };

    const boldTextOptions = {
    font: boldFont,
    size: 10,
    color: rgb(0, 0, 0),
    };

    const labels = [
    ['Cliente:', 'CNPJ:'],
    ['Endereço:', 'Contato:'],
    ['Técnico Executor:', 'Data da Inspeção:']
    ];

    const values = [
    [reportData.client, reportData.cnpj !== 'null' ? reportData.cnpj : 'N/A'],
    [reportData.address.split(',')[0], reportData.contact !== 'null' ? reportData.contact : 'N/A'],
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
        x: labelRow[0] === 'Técnico Executor:' ? (tableMargin + columnWidth / 2) : (tableMargin + 60),
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

    // Draw the equipment table 2 cm below the centered text
    const equipmentTableStartY = tableStartY - 46.68; // 2 cm below the centered text
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
    const equipmentValues = [equipmentData.equipment, equipmentData.manufacturer, equipmentData.serialNumber !== 'null' ? equipmentData.serialNumber : 'N/A'];

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
 
    // Calculate the initial Y position for the services table
    const servicesTableStartY = equipmentTableStartY - 8.68; // 2 cm below the services text

    // Calculate the height of the services table dynamically based on bodyData length
    const rowCount = bodyData.length + 1; // +1 for header row
    const servicesTableHeight = rowCount * 13 + 5; // Adjust as necessary

    // Define column widths
    const firstColumnWidth = (tableWidth / 3) - 24.34; // 1 cm less from each side
    const middleColumnWidth = (tableWidth / 3) + 50.68; // 2 cm more

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
    const columnWidths = [firstColumnWidth, middleColumnWidth];
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
    const headers = ['Serviços Executados', ''];
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
        page.drawText(bullet + item.description + ':' + item.value, {
            x: tableMargin + firstColumnWidth + cellPadding,
            y: bodyStartY - rowIndex * 12, // Adjusted font size
            font,
            size: 8, // Smaller font size
            color: rgb(0, 0, 0),
        });
    });

    // Position for the new parts table
    const partsTableStartY = bodyStartY - bodyData.length * 12 - 15; // 20 points below the bodyData table

    // Column headers
    const partsColumnHeaders = ['Quant.', 'Peças utilizadas nesta manutenção', 'Valor'];
    const columnWidthsPecas = [50, 300, 100];

    partsColumnHeaders.forEach((header, index) => {
        page.drawText(header, {
        x: tableMargin + columnWidthsPecas.slice(0, index).reduce((a, b) => a + b, 0),
        y: partsTableStartY - lineHeight,
        font: boldFont,
        size: 10,
        color: rgb(0, 0, 0),
        });
    });

    // Draw the parts data
    let totalValue = 0;
    partData.forEach((part, rowIndex) => {
        const columns = part.split(' - ');
        const description = columns[0];
        const valueString = columns[1];
        const quantity = '1'; // Assuming quantity is always 1 as per the provided format

        page.drawText(quantity, {
        x: tableMargin,
        y: partsTableStartY - (rowIndex + 2) * lineHeight, // Adjust row index
        font,
        size: 10,
        color: rgb(0, 0, 0),
        });

        page.drawText(description, {
        x: tableMargin + columnWidthsPecas[0],
        y: partsTableStartY - (rowIndex + 2) * lineHeight,
        font,
        size: 10,
        color: rgb(0, 0, 0),
        });

        page.drawText(valueString, {
        x: tableMargin + columnWidthsPecas[0] + columnWidthsPecas[1],
        y: partsTableStartY - (rowIndex + 2) * lineHeight,
        font,
        size: 10,
        color: rgb(0, 0, 0),
        });

        // Extract the value from the part string
        const valueMatch = valueString.split('$');
        if (valueMatch) {
            const value = parseFloat(valueMatch[1]);
            totalValue += value;
        }

        // Draw row line
        page.drawLine({
        start: { x: tableMargin, y: partsTableStartY - (rowIndex + 2) * lineHeight - 5 },
        end: { x: tableMargin + tableWidth, y: partsTableStartY - (rowIndex + 2) * lineHeight - 5 },
        thickness: 1,
        color: rgb(0.75, 0.75, 0.75),
        });
    });

    // Draw the total value
    const totalValueY = partsTableStartY - (partData.length + 2) * lineHeight;
    page.drawText(`Total: R$${totalValue.toFixed(2)}`, {
        x: tableMargin + columnWidthsPecas[0] + columnWidthsPecas[1],
        y: totalValueY,
        font: boldFont,
        size: 10,
        color: rgb(0, 0, 0),
    });

    // Draw the table border
    const tableBorderYStart = partsTableStartY - lineHeight - 5;
    const tableBorderYEnd = totalValueY - lineHeight ;

    page.drawRectangle({
        x: tableMargin,
        y: tableBorderYEnd,
        width: tableWidth,
        height: tableBorderYStart - tableBorderYEnd,
        borderColor: rgb(0.75, 0.75, 0.75),
        borderWidth: 1,
    });

    // Draw text after services table
    // const disclaimerText = `Declaramos para os devidos fins, que o(s) equipamento(s) eletromédico(s)citado(s) acima,\nestá(estão) em conformidadede funcionamento, de acordo com a revisão realizada pela empresa\nFóton Tecnologia LTDA, inscrita no CNPJ: 04.084.772/0001-00.`;
    const responsibleText = `Responsável técnico: Fábio Antônio Vilela - CRT-MG: 044.098.696-63`;

    // Calculate positions
    const disclaimerTextY = servicesTableStartY - servicesTableHeight - 26.68; // 1 cm below the services table
    const responsibleTextY = tableBorderYEnd - 20.34; // 1 cm below the disclaimer text

   // Draw disclaimer text
    // page.drawText(disclaimerText, {
    //     x: tableMargin,
    //     y: disclaimerTextY,
    //     font,
    //     size: 10, // Smaller font size
    //     color: rgb(0, 0, 0),
    //     lineHeight: 13, // Adjust line height as needed
    // });

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
    const textY = bottomMargin + 105; // 1 cm above the blue line
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

        const clinicImageWidth = 90; // Adjust as needed
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