import { Pdf } from "./Pdf";
import { PdfText } from "./PdfText";

export class PdfH2 extends PdfText {
  constructor(protected pdf: Pdf, ...lines: string[]) {
    super(pdf, lines.join("\n"));

    this._fontSize = pdf.styles.h2.fontSize;
    this._lineHeight = pdf.styles.h2.lineHeight;
    this._color = pdf.styles.h2.color ?? pdf.styles.color;
    this._bold = pdf.styles.h2.bold ?? pdf.styles.bold;
  }

  build() {
    return super.build();
  }
}
