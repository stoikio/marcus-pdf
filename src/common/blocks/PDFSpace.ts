import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";
import { PDFText } from "./PDFText";

export class PDFSpace extends PDFBlock {
  blocks: PDFBlock[];

  constructor(protected pdf: PDF, private space: number, blocks: (PDFBlock | string)[]) {
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
    const styledBlocks = this.blocks.map((block, i) => {
      if (i === this.blocks.length - 1) {
        return block.build();
      } else {
        return {
          ...block.build(),
          margin: [0, 0, 0, this.space],
        };
      }
    });

    return {
      stack: styledBlocks,
    };
  }
}
