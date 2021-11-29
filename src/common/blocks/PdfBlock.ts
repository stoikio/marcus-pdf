export class PdfBlock {
  protected _colSpan: number = 1;
  protected _rowSpan: number = 1;
  protected _width!: number;

  colSpan(colSpan: number) {
    this._colSpan = colSpan;
    return this;
  }

  rowSpan(rowSpan: number) {
    this._rowSpan = rowSpan;
    return this;
  }

  width(width: number) {
    this._width = width;
    return this;
  }

  build(...args: any): any {
    return {
      rowSpan: this._rowSpan,
      colSpan: this._colSpan,
      width: this._width,
    };
  }
}
