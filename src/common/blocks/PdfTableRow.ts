import { Pdf } from "./Pdf";
import { PdfBlock } from "./PdfBlock";
import { PdfText } from "./PdfText";

export class PdfTableRow extends PdfBlock {
  private _blocks: PdfBlock[];
  protected _bold: boolean = this.pdf.styles.bold;
  protected _color: string = this.pdf.styles.color;
  protected _fillColor: string = this.pdf.styles.table.row.fillColor;
  protected _fontSize: number = this.pdf.styles.fontSize;
  private _py!: number;
  private _spaceBefore: boolean = false;
  private _spaceAfter: boolean = false;

  constructor(protected pdf: Pdf, ...blocks: (PdfBlock | string)[]) {
    super();
    this._blocks = blocks.map((block) => {
      if (typeof block === "string") {
        return new PdfText(pdf, block);
      } else {
        return block;
      }
    });
  }

  bold(bold: boolean = true) {
    this._bold = bold;
    return this;
  }

  color(color: string) {
    this._color = color;
    return this;
  }

  fillColor(fillColor: string) {
    this._fillColor = fillColor;
    return this;
  }

  fontSize(fontSize: number) {
    this._fontSize = fontSize;
    return this;
  }

  py(py: number) {
    this._py = py;
    return this;
  }

  spaceBefore(spaceBefore: boolean = true) {
    this._spaceBefore = spaceBefore;
    return this;
  }

  spaceAfter(spaceAfter: boolean = true) {
    this._spaceAfter = spaceAfter;
    return this;
  }

  build(py: number) {
    const spaceBeforeMultiplier = this._spaceBefore ? 2 : 1;
    const spaceAfterMultiplier = this._spaceAfter ? 2 : 1;

    const topMargin = typeof this._py === "number" ? this._py * spaceBeforeMultiplier : py * spaceBeforeMultiplier;
    const bottomMargin = typeof this._py === "number" ? this._py * spaceAfterMultiplier : py * spaceAfterMultiplier;

    const margin = [0, topMargin, 0, bottomMargin];

    return this._blocks.map((block) => ({
      ...block.build(),
      fillColor: this._fillColor,
      color: this._color,
      bold: this._bold,
      fontSize: this._fontSize,
      margin,
    }));
  }
}
