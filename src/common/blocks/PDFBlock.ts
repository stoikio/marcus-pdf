import { Alignment } from "pdfmake/interfaces";

export class PDFBlock {
  protected _colSpan: number = 1;
  protected _rowSpan: number = 1;
  protected _width?: number;
  protected _absoluteX?: number;
  protected _absoluteY?: number;
  protected _margin?: number | [x: number, y: number] | [left: number, top: number, right: number, bottom: number];

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

  absolute(x: number, y: number) {
    this._absoluteX = x;
    this._absoluteY = y;
    return this;
  }

  margin(margin: number | [x: number, y: number] | [left: number, top: number, right: number, bottom: number]) {
    this._margin = margin;
    return this;
  }

  build(...args: any): any {
    return {
      rowSpan: this._rowSpan,
      colSpan: this._colSpan,
      width: this._width,
      margin: this._margin,
      absolutePosition: this._absoluteX !== undefined && this._absoluteY !== undefined ? { x: this._absoluteX, y: this._absoluteY } : undefined
    };
  }
}
