import { PDF } from "./PDF";
import { PDFText } from "./PDFText";

export class PDFH2 extends PDFText {
  constructor(protected pdf: PDF, ...lines: string[]) {
    super(pdf, lines.join("\n"));

    this._fontSize = pdf.styles.h2.fontSize;
    this._lineHeight = pdf.styles.h2.lineHeight ?? pdf.styles.lineHeight;
    this._color = pdf.styles.h2.color ?? pdf.styles.color;
    this._bold = pdf.styles.h2.bold;
  }

  build() {
    return super.build();
  }
}
