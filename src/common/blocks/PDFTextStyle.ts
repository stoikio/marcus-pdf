import deepmerge from "deepmerge";
import { Alignment } from "pdfmake/interfaces";
import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";

export class PDFTextStyle extends PDFBlock {
  protected _bold: boolean = this.pdf.styles.bold;
  protected _color!: string;
  protected _fontSize: number = this.pdf.styles.fontSize;
  protected _lineHeight: number = this.pdf.styles.lineHeight;
  protected _align: Alignment = "left";
  protected _font: string = this.pdf.styles.font;
  protected _italics: boolean = false;

  constructor(protected pdf: PDF) {
    super();
  }

  align(align: Alignment) {
    this._align = align;
    return this;
  }

  bold(bold: boolean = true) {
    this._bold = bold;
    return this;
  }

  color(color: string) {
    this._color = color;
    return this;
  }

  font(font: string) {
    this._font = font;
    return this;
  }

  fontSize(fontSize: number) {
    this._fontSize = fontSize;
    return this;
  }

  italics(italics: boolean = true) {
    this._italics = italics;
    return this;
  }

  lineHeight(lineHeight: number) {
    this._lineHeight = lineHeight;
    return this;
  }

  secondary(secondary: boolean = true) {
    this._color = secondary ? this.pdf.styles.secondaryColor : this.pdf.styles.color;
    return this;
  }

  build() {
    const build = {
      style: {
        align: this._align,
        bold: this._bold,
        color: this._color,
        font: this._font,
        fontSize: this._fontSize,
        italics: this._italics,
        lineHeight: this._lineHeight,
      },
    };

    return deepmerge(super.build(), build);
  }
}
