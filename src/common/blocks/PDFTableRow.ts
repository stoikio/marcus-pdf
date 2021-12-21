import { mergeMargin } from "../utils";
import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";
import { PDFText } from "./PDFText";

export class PDFTableRow extends PDFBlock {
  private _blocks: PDFBlock[];
  protected _bold: boolean = false;
  protected _color: string = this.pdf.styles.color;
  protected _fillColor: string = this.pdf.styles.table.row.fillColor;
  protected _fontSize: number = this.pdf.styles.fontSize;
  private _py!: number;
  private _spaceBefore: boolean = false;
  private _spaceAfter: boolean = false;

  constructor(protected pdf: PDF, ...blocks: (PDFBlock | string)[]) {
    super();
    this._blocks = blocks.map((block) => {
      if (typeof block === "string") {
        return new PDFText(pdf, block);
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

    return this._blocks.map((block) => {
      const margin = mergeMargin(block.build().margin ?? 0, [0, topMargin, 0, bottomMargin])

      return ({
        ...block.build(),
        fillColor: this._fillColor,
        color: this._color,
        bold: this._bold,
        fontSize: this._fontSize,
        margin,
      })
    });
  }
}
