import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ICON_SIZE = 5;
const TITLE_START_X = 14;
const TITLE_START_Y = 20;
const TABLE_START_Y = 28;

const TITLE_FONT_SIZE = 36;
const HABITS_FONT_SIZE = 18.5;
const TRACKING_FONT_SIZE = 12;
const TABLE_MARGIN = 115;
const SP = '  ';

const HIGHLIGHT_COLOUR = '#eeeeee';
const WEEKEND_HIGHLIGHT_COLOUR = '#cccccc';
const TEXT_COLOUR = '#000000';
const LINE_COLOUR = '#000000';

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
    return [[SP, SP, SP, SP, SP, SP, SP, SP, SP, SP]];
  }

  return [[SP, '1', '2', '3', '4', '5', '6', '7', '8', '9']];
}

const isWeekend = (cellText) => {
  const cText = cellText.toLowerCase();
  if(cText.includes('sat') || cText.includes('sun')) {
    return true;
  }
  return false;
}

const isNumber = (cellText) => {
  const int = Number.parseInt(cellText, 10);
  return Number.isInteger(int);
}

const headStyle = {
  halign: 'center',
  fillColor: HIGHLIGHT_COLOUR,
  lineWidth: 0.25,
};

const habitsColumnStyle = {
  0: {
    halign: 'center',
    valign: 'middle',
    fillColor: HIGHLIGHT_COLOUR,
  },
};

const trackingColumnStyle = {
  0: {
    halign: 'right',
    fillColor: HIGHLIGHT_COLOUR,
  },
};

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
      return [row.toLowerCase(), SP, SP, SP, SP, SP, SP, SP, SP, SP];
    });

    const willDrawHabitsTableCell = (data) => {
      if (data.column.index === 0 && isNumber(data.cell.text[0])) {
        pdfDoc.setFontSize(HABITS_FONT_SIZE * 1.75);
        pdfDoc.setFontStyle('bold');
      }
    }

    const didDrawHabitsTableCell = (data) => {
      // in Icon Mode, render an image as the habits key (to the left of the habit text)
      if (iconMode && data.column.index === 0 && currentTable.habits[data.row.index]) {
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
    };

    const didParseTrackingTableCell = (data) => {
      if(data.section === 'head') {
        const cellStyles = data.cell.styles;
        if(data.column.index === 0) {
          cellStyles.lineWidth = 0;
          cellStyles.fillColor = '#ffffff';
        }

        if(!iconMode) {
          const offsetIdx = data.column.index - 1;
          if(currentTable.habits[offsetIdx] && isNumber(data.cell.text[0])) {
            cellStyles.fontStyle = 'bold';
            cellStyles.fontSize = TRACKING_FONT_SIZE * 1.4;
            cellStyles.cellPadding = 0.5;
          } else {
            data.cell.text = [''];
          }
        }
      }
    }

    const willDrawTrackingTableCell = (data) => {
      if (data.column.index === 0 && isWeekend(data.cell.text[0])) {
        pdfDoc.setFillColor(WEEKEND_HIGHLIGHT_COLOUR);
        pdfDoc.setFontStyle('bold');
      }
    }

    const didDrawTrackingTableCell = (data) => {
      // in Icon Mode, render an image as the habits key (on the top of the tracking table)
      if (iconMode && data.section === 'head' && data.column.index !== 0) {
        const offsetIdx = data.column.index - 1;
        if (currentTable.habits[offsetIdx]) {
          const imgX = data.cell.x + 1.5;
          const imgY = data.cell.y + 1.5;
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
    };

    pdfDoc.setFontSize (TITLE_FONT_SIZE);
    pdfDoc.text (
      `${tables[i].month.toUpperCase()} ${tables[i].year}`,
      TITLE_START_X,
      TITLE_START_Y
    );

    // HABITS TABLE
    pdfDoc.autoTable ({
      body: getHabitRows(currentTable.habits, iconMode),
      theme: 'grid',
      headStyles: headStyle,
      columnStyles: habitsColumnStyle,
      styles: {
        fontSize: HABITS_FONT_SIZE,
        cellPadding: 5,
        lineColor: LINE_COLOUR,
        textColor: TEXT_COLOUR,
      },
      startY: TABLE_START_Y,
      willDrawCell: willDrawHabitsTableCell,
      didDrawCell: didDrawHabitsTableCell,
      margin: {right: TABLE_MARGIN},
    });

    pdfDoc.setPage (pageNumber);

    // TRACKING TABLE
    pdfDoc.autoTable ({
      head: getHeadRow(iconMode),
      body: tableRows,
      theme: 'grid',
      headStyles: headStyle,
      columnStyles: trackingColumnStyle,
      styles: {
        fontSize: TRACKING_FONT_SIZE,
        cellPadding: 1.25,
        lineColor: LINE_COLOUR,
        textColor: TEXT_COLOUR,
      },
      startY: TABLE_START_Y,
      didParseCell: didParseTrackingTableCell,
      willDrawCell: willDrawTrackingTableCell,
      didDrawCell: didDrawTrackingTableCell,
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
