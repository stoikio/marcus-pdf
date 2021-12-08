import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";
import { PDFTableRow } from "./PDFTableRow";

export class PDFTable extends PDFBlock {
  private _id: string = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
  private _rows: PDFTableRow[] = [];
  private _headerRows: number = 0;
  private _widths: string[] = [];
  private _borders: boolean = this.pdf.styles.table.borders;
  private _px: number = 0;
  private _py: number = 0;

  constructor(protected pdf: PDF) {
    super();
  }

  headerRows(numberOfHeaderRows: number) {
    this._headerRows = numberOfHeaderRows;
    return this;
  }

  Body(...rows: (PDFTableRow | undefined)[]) {
    const filteredRows = rows.filter((row): row is PDFTableRow => typeof row !== "undefined")
    this._rows = [...this._rows, ...filteredRows];

    return this;
  }

  columnsLayout(widths: string[]) {
    this._widths = widths;
    return this;
  }

  borders(borders: boolean = true) {
    this._borders = borders;
    return this;
  }

  px(px: number) {
    this._px = px;
    return this;
  }

  py(py: number) {
    this._py = py;
    return this;
  }

  private buildLayout() {
    this.pdf.addTableLayout(this._id, {
      defaultBorder: this._borders,
      paddingLeft: () => this._px,
      paddingRight: () => this._px,
    });
  }

  build() {
    this.buildLayout();

    return {
      layout: this._id,
      table: {
        widths: this._widths,
        headerRows: this._headerRows,
        body: [...this._rows.map((row) => row.build(this._py))],
      },
    };
  }
}
