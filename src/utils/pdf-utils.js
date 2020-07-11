import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ICON_SIZE = 5;
const TITLE_START_X = 14;
const TITLE_START_Y = 16;
const TABLE_START_Y = 22;

const TITLE_FONT_SIZE = 28;
const TABLE_MARGIN = 115;

const generatePdf = tables => {
  const pdfDoc = new jsPDF ({
    orientation: 'p',
    unit: 'mm',
    format: 'letter',
  });

  for (let i = 0; i < tables.length; i++) {
    const pageNumber = pdfDoc.internal.getNumberOfPages ();
    const sp = '  ';
    const currentTable = tables[i];
    const habitRows = currentTable.habits.map (hab => {
      return [sp, hab.description];
    });
    const tableRows = currentTable.rows.map (row => {
      return [row, sp, sp, sp, sp, sp, sp, sp, sp, sp];
    });

    const habitsTableHook = function (data) {
      if (data.column.dataKey === 0) {
        const imgX = data.cell.x + 1.5;
        const imgY = data.cell.y + 1.5;

        if (currentTable.habits[data.row.index]) {
          const staticImg = document.createElement ('img');
          staticImg.src = currentTable.habits[data.row.index].icon;
          pdfDoc.addImage (staticImg, 'PNG', imgX, imgY, ICON_SIZE, ICON_SIZE);
        }
      }
    };

    const trackingTableHook = function (data) {
      if (data.section === 'head' && data.column.dataKey !== 0) {
        const imgX = data.cell.x + 1.5;
        const imgY = data.cell.y + 1.5;

        const offsetIdx = data.column.index - 1;
        if (currentTable.habits[offsetIdx]) {
          const staticImg = document.createElement ('img');
          staticImg.src = currentTable.habits[offsetIdx].icon;
          pdfDoc.addImage (staticImg, 'PNG', imgX, imgY, ICON_SIZE, ICON_SIZE);
        }
      }
    };

    const headStyle = {
      halign: 'center',
      textColor: '#000000',
      fillColor: '#eeeeee',
      lineWidth: 0.25,
    };
    const headRow = [['Day', sp, sp, sp, sp, sp, sp, sp, sp, sp]];
    const colStyle = {
      0: {
        halign: 'right',
        fillColor: '#eeeeee',
      },
    };

    pdfDoc.setFontSize (TITLE_FONT_SIZE);
    pdfDoc.text (
      `${tables[i].month} ${tables[i].year}`,
      TITLE_START_X,
      TITLE_START_Y
    );
    pdfDoc.autoTable ({
      body: habitRows,
      theme: 'grid',
      headStyles: headStyle,
      columnStyles: colStyle,
      startY: TABLE_START_Y,
      didDrawCell: habitsTableHook,
      margin: {right: TABLE_MARGIN},
    });
    pdfDoc.setPage (pageNumber);

    pdfDoc.autoTable ({
      head: headRow,
      body: tableRows,
      theme: 'grid',
      headStyles: headStyle,
      columnStyles: colStyle,
      startY: TABLE_START_Y,
      didDrawCell: trackingTableHook,
      margin: {left: TABLE_MARGIN},
    });

    if (i < tables.length - 1) {
      pdfDoc.addPage ('letter', 'p');
    }
  }

  const filename = `routinetrax-${Date.now ()}.pdf`;
  pdfDoc.save (filename);
};

export {generatePdf};
