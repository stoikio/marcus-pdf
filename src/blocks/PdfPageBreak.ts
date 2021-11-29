import { Pdf } from "./Pdf";
import { PdfBlock } from "./PdfBlock";

export class PdfPageBreak extends PdfBlock {
  constructor(protected pdf: Pdf) {
    super();
  }

  build() {
    return {
      text: "",
      pageBreak: "after",
    };
  }
}
