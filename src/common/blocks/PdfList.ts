import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";
import { PDFText } from "./PDFText";

export class PDFList extends PDFBlock {
  private type: "ordered" | "unordered" = "unordered";
  private blocks: PDFBlock[] = [];

  constructor(protected pdf: PDF, ...blocks: (PDFBlock | string)[]) {
    super();

    this.blocks = blocks.map((block) => {
      if (typeof block === "string") {
        return new PDFText(pdf, block);
      } else {
        return block;
      }
    });
  }

  build() {
    return {
      [this.type === "unordered" ? "ul" : "ol"]: this.blocks.map((block) => block.build()),
      margin: [4, 0],
    };
  }
}
