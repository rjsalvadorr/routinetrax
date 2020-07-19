import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ICON_SIZE = 5;
const TITLE_START_X = 14;
const TITLE_START_Y = 16;
const TABLE_START_Y = 22;

const TITLE_FONT_SIZE = 28;
const TABLE_MARGIN = 115;
const SP = '  ';

const getHabitRows = (habits, iconMode) => {
  if(iconMode) {
    return habits.map (hab => {
      return [SP, hab.description];
    });
  }

  const habitRows = [];
  for(let i = 0; i < habits.length; i++) {
    habitRows.push([`${i + 1}`, habits[i].description]);
  }
  return habitRows;
}

const getHeadRow = (iconMode) => {
  if(iconMode) {
    return [['Day', SP, SP, SP, SP, SP, SP, SP, SP, SP]];
  }

  return [['Day', '1', '2', '3', '4', '5', '6', '7', '8', '9']];
}

const generatePdf = (tables, iconMode) => {
  const pdfDoc = new jsPDF ({
    orientation: 'p',
    unit: 'mm',
    format: 'letter',
  });

  for (let i = 0; i < tables.length; i++) {
    const pageNumber = pdfDoc.internal.getNumberOfPages ();
    const currentTable = tables[i];
    const tableRows = currentTable.rows.map (row => {
      return [row, SP, SP, SP, SP, SP, SP, SP, SP, SP];
    });

    const habitsTableHook = function (data) {
      if (data.column.dataKey === 0) {
        if (currentTable.habits[data.row.index]) {
          console.log (data);
          if (iconMode) {
            const imgX = data.cell.x + 1.5;
            const imgY = data.cell.y + 1.5;
            const staticImg = document.createElement ('img');
            staticImg.src = currentTable.habits[data.row.index].icon;
            pdfDoc.addImage (
              staticImg,
              'PNG',
              imgX,
              imgY,
              ICON_SIZE,
              ICON_SIZE
            );
          }
        }
      }
    };

    const trackingTableHook = function (data) {
      if (data.section === 'head' && data.column.dataKey !== 0) {
        if (iconMode) {
          const imgX = data.cell.x + 1.5;
          const imgY = data.cell.y + 1.5;

          const offsetIdx = data.column.index - 1;
          if (currentTable.habits[offsetIdx]) {
            const staticImg = document.createElement ('img');
            staticImg.src = currentTable.habits[offsetIdx].icon;
            pdfDoc.addImage (
              staticImg,
              'PNG',
              imgX,
              imgY,
              ICON_SIZE,
              ICON_SIZE
            );
          }
        }
      }
    };

    const headStyle = {
      halign: 'center',
      textColor: '#000000',
      fillColor: '#eeeeee',
      lineWidth: 0.25,
    };
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
      body: getHabitRows(currentTable.habits, iconMode),
      theme: 'grid',
      headStyles: headStyle,
      columnStyles: colStyle,
      startY: TABLE_START_Y,
      didDrawCell: habitsTableHook,
      margin: {right: TABLE_MARGIN},
    });
    pdfDoc.setPage (pageNumber);

    pdfDoc.autoTable ({
      head: getHeadRow(iconMode),
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
