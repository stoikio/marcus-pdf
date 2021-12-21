import { PDF } from "./PDF";
import { PDFText } from "./PDFText";

export class PDFH4 extends PDFText {
  constructor(protected pdf: PDF, ...lines: string[]) {
    super(pdf, lines.join("\n"));

    this._fontSize = pdf.styles.h4.fontSize;
    this._lineHeight = pdf.styles.h4.lineHeight ?? pdf.styles.lineHeight;
    this._color = pdf.styles.h4.color ?? pdf.styles.color;
    this._bold = pdf.styles.h4.bold;
  }

  build() {
    return super.build();
  }
}
