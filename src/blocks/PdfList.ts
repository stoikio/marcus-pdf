import { Pdf } from "./Pdf";
import { PdfBlock } from "./PdfBlock";
import { PdfText } from "./PdfText";

export class PdfList extends PdfBlock {
  private type: "ordered" | "unordered" = "unordered";
  private blocks: PdfBlock[] = [];

  constructor(protected pdf: Pdf, ...blocks: (PdfBlock | string)[]) {
    super();

    this.blocks = blocks.map((block) => {
      if (typeof block === "string") {
        return new PdfText(pdf, block);
      } else {
        return block;
      }
    });
  }

  build() {
    return {
      [this.type === "unordered" ? "ul" : "ol"]: this.blocks.map((block) => block.build()),
      margin: [5, 0],
    };
  }
}
