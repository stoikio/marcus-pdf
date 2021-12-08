import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";

export class PDFPageBreak extends PDFBlock {
  constructor(protected pdf: PDF) {
    super();
  }

  build() {
    return {
      text: "",
      pageBreak: "after",
    };
  }
}
