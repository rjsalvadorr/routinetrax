import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NUM_TABLES } from '../utils/time-calcs';
import testImg from '../icons/food/icon-bacon.png';

const NUM_PAIRS = NUM_TABLES / 2;

const ICON_SIZE = 5;
const TABLE_START_Y = 22;
const TITLE_FONT_SIZE = 24;
const TITLE_START_X = 14;
const TITLE_START_Y = 16;
const TABLE_MARGIN = 115;

const generatePdf = tables => {
  const pdfDoc = new jsPDF ({
    orientation: 'p',
    unit: 'mm',
    format: 'letter',
  });
  pdfDoc.setFontSize (TITLE_FONT_SIZE);

  for (let i = 0; i < NUM_PAIRS; i++) {
    const pageNumber = pdfDoc.internal.getNumberOfPages ();
    const leftIdx = i * 2;
    const rightIdx = leftIdx + 1;
    const sp = '  ';

    const leftTable = tables[leftIdx];
    const leftRows = leftTable.rows.map (row => {
      return [row, sp, sp, sp, sp, sp, sp, sp, sp, sp];
    });
    const rightTable = tables[rightIdx];
    const rightRows = rightTable.rows.map (row => {
      return [row, sp, sp, sp, sp, sp, sp, sp, sp, sp];
    });

    const drawCellHook = function (data) {
      if (data.section === 'head' && data.column.dataKey !== 0) {
        const imgX = data.cell.x + 1.5;
        const imgY = data.cell.y + 1.5;
        pdfDoc.addImage (testImg, 'PNG', imgX, imgY, ICON_SIZE, ICON_SIZE);
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

    pdfDoc.text (
      `${leftTable.month} ${leftTable.year}`,
      TITLE_START_X,
      TITLE_START_Y
    );
    pdfDoc.autoTable ({
      head: headRow,
      body: leftRows,
      theme: 'grid',
      headStyles: headStyle,
      columnStyles: colStyle,
      startY: TABLE_START_Y,
      didDrawCell: drawCellHook,
      margin: {right: TABLE_MARGIN},
    });
    pdfDoc.setPage (pageNumber);

    const rightTitleX = TITLE_START_X + TABLE_MARGIN - 14;
    pdfDoc.text (
      `${rightTable.month} ${rightTable.year}`,
      rightTitleX,
      TITLE_START_Y
    );
    pdfDoc.autoTable ({
      head: headRow,
      body: rightRows,
      theme: 'grid',
      headStyles: headStyle,
      columnStyles: colStyle,
      startY: TABLE_START_Y,
      didDrawCell: drawCellHook,
      margin: {left: TABLE_MARGIN},
    });

    if (i < NUM_PAIRS - 1) {
      pdfDoc.addPage ('letter', 'p');
    }
  }

  const filename = `routinetrax-${Date.now ()}.pdf`;
  pdfDoc.save (filename);
};

export {generatePdf};
