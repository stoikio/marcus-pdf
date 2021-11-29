import { Pdf } from "./Pdf";
import { PdfText } from "./PdfText";

export class PdfH1 extends PdfText {
  constructor(protected pdf: Pdf, ...lines: string[]) {
    super(pdf, lines.join("\n"));

    this._fontSize = pdf.styles.h1.fontSize;
    this._lineHeight = pdf.styles.h1.lineHeight;
    this._color = pdf.styles.h1.color ?? pdf.styles.color;
    this._bold = pdf.styles.h1.bold ?? pdf.styles.bold;
  }

  build() {
    return super.build();
  }
}
