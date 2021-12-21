import { PDF } from "./PDF";
import { PDFText } from "./PDFText";

export class PDFH1 extends PDFText {
  constructor(protected pdf: PDF, ...lines: string[]) {
    super(pdf, lines.join("\n"));

    this._fontSize = pdf.styles.h1.fontSize;
    this._lineHeight = pdf.styles.h1.lineHeight ?? pdf.styles.lineHeight;
    this._color = pdf.styles.h1.color ?? pdf.styles.color;
    this._bold = pdf.styles.h1.bold;
  }

  build() {
    return super.build();
  }
}
