import React from 'react';
import Select from 'react-select';
import { DateTime } from 'luxon';
import Layout from '../components/layout';
import SEO from '../components/seo';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import testImg from '../icons/food/icon-bacon.png';

const NUM_TABLES = 6; // must be an even number!
const NUM_PAIRS = NUM_TABLES / 2;

const ICON_SIZE = 5;
const TABLE_START_Y = 22;
const TITLE_FONT_SIZE = 24;
const TITLE_START_X = 14;
const TITLE_START_Y = 16;
const TABLE_MARGIN = 115;

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const paperOptions = [
    { value: 'letter', label: 'Letter' },
    { value: 'a4', label: 'A4' },
]

const computeMonthRows = (dtObj) => {
    const yr = dtObj.year;
    const mon = dtObj.month;
    const dt = DateTime.fromObject({ year: yr, month: mon });

    const monthRows = [];
    for (let dy = 1; dy <= dt.daysInMonth; dy++) {
        const dayStr = DateTime.fromObject({ year: yr, month: mon, day: dy }).toFormat('ccc dd');
        monthRows.push(dayStr);
    }
    return monthRows;
}

const computeTables = (startMonthObj) => {
    const start = DateTime.fromObject(startMonthObj);
    const tables = [];

    tables.push({
        year: start.year,
        month: start.monthLong,
        rows: computeMonthRows(start)
    });
    for (let offset = 1; offset < NUM_TABLES; offset++) {
        const currentDt = start.plus({ months: offset });
        tables.push({
            year: currentDt.year,
            month: currentDt.monthLong,
            rows: computeMonthRows(currentDt)
        });
    }
    return tables;
}

class IndexPage extends React.Component {
    constructor(props) {
        super(props);

        const localDt = DateTime.local();

        this.state = {
            startDate: localDt.toObject(),
            endDate: localDt.plus({ months: 3 }).toObject(),
            paperType: paperOptions[0],
            habits: [
                {
                    icon: 'thing-1',
                    description: 'Resemble intellectual figs',
                },
                {
                    icon: 'thing-2',
                    description: 'Name a humorous peach',
                },
                {
                    icon: 'thing-3',
                    description: 'Separate peaches from dogs',
                },
            ],
            tables: computeTables(localDt.toObject()),
        };

        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.handlePaperType = this.handlePaperType.bind(this);
        this.getPdfDocument = this.getPdfDocument.bind(this);
    }

    handleStartDate(uiDate) {
        const newDate = DateTime.fromJSDate(uiDate);
        this.setState({
            startDate: newDate.toObject(),
            tables: [computeMonthRows(newDate.toObject())]
        });
    }

    handleEndDate(uiDate) {
        const newDate = DateTime.fromJSDate(uiDate);
        this.setState({
            endDate: newDate.toObject(),
            tables: [computeMonthRows(newDate.toObject())]
        });
    }

    handlePaperType(uiPaperType) {
        this.setState({
            paperType: uiPaperType
        });
    }

    getPdfDocument(tables) {
        const pdfDoc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'letter',
        });
        pdfDoc.setFontSize(TITLE_FONT_SIZE)

        for (let i = 0; i < NUM_PAIRS; i++) {
            const pageNumber = pdfDoc.internal.getNumberOfPages();
            const leftIdx = i * 2;
            const rightIdx = leftIdx + 1;
            const sp = '  ';

            const leftTable = this.state.tables[leftIdx];
            const leftRows = leftTable.rows.map(row => {
                return [row, sp, sp, sp, sp, sp, sp, sp, sp, sp];
            });
            const rightTable = this.state.tables[rightIdx];
            const rightRows = rightTable.rows.map(row => {
                return [row, sp, sp, sp, sp, sp, sp, sp, sp, sp];
            });

            const drawCellHook = function(data) {
                if (data.section === 'head' && data.column.dataKey !== 0) {
                    const imgX = data.cell.x + 1.5;
                    const imgY = data.cell.y + 1.5;
                    pdfDoc.addImage(testImg, 'PNG', imgX, imgY, ICON_SIZE, ICON_SIZE);
                }
            };
            const headStyle = {
                halign: 'center',
                textColor: '#000000',
                fillColor: '#eeeeee',
                lineWidth: 0.25
            };
            const headRow = [
                ['Day', sp, sp, sp, sp, sp, sp, sp, sp, sp],
            ];
            const colStyle = {
                0: {
                    halign: 'right',
                    fillColor: '#eeeeee',
                }
            };
    
            pdfDoc.text(`${leftTable.month} ${leftTable.year}`, TITLE_START_X, TITLE_START_Y);
            pdfDoc.autoTable({
                head: headRow,
                body: leftRows,
                theme: 'grid',
                headStyles: headStyle,
                columnStyles: colStyle,
                startY: TABLE_START_Y,
                didDrawCell: drawCellHook,
                margin: { right: TABLE_MARGIN },
            });
            pdfDoc.setPage(pageNumber);

            const rightTitleX = TITLE_START_X + TABLE_MARGIN - 14;
            pdfDoc.text(`${rightTable.month} ${rightTable.year}`, rightTitleX, TITLE_START_Y);
            pdfDoc.autoTable({
                head: headRow,
                body: rightRows,
                theme: 'grid',
                headStyles: headStyle,
                columnStyles: colStyle,
                startY: TABLE_START_Y,
                didDrawCell: drawCellHook,
                margin: { left: TABLE_MARGIN },
            });

            if (i < NUM_PAIRS - 1) {
                pdfDoc.addPage('letter', 'p');
            }
        }

        const filename = `routinetrax-${Date.now()}.pdf`;
        pdfDoc.save(filename);
    }

    render() {
        return (
            <Layout>
                <SEO title="Home" />
                <h1>routinetrax</h1>
                <p>Paper-based habits tracking, supercharged</p>

                <div className="control-group">
                    <span className="label">Paper type</span>
                    <Select
                        className="rt-control rt-control--select"
                        value={this.state.paperType}
                        options={paperOptions}
                        onChange={this.handlePaperType}
                    />
                </div>
                <div className="control-group">
                    <span className="label">Title</span>
                    <input className="rt-control rt-control--text"
                        type="text"
                        id="title"
                        name="title"
                        required maxLength="20"
                    />
                </div>
                <div className="control-group">
                    <span className="label">Icon</span>
                    <Select className="rt-control rt-control--select" options={options} />
                </div>
                <div className="control-group">
                    <span className="label">Habit</span>
                    <input className="rt-control rt-control--text" type="text" id="habit-1" name="habit-1" required maxLength="20" />
                </div>

                <button className="rt-button rt-button--sheets" onClick={this.getPdfDocument}>Get routinetrax sheets</button>
            </Layout>
        );
    }
}

export default IndexPage;
