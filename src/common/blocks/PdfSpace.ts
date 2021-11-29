import { Pdf } from "./Pdf";
import { PdfBlock } from "./PdfBlock";
import { PdfText } from "./PdfText";

export class PdfSpace extends PdfBlock {
  blocks: PdfBlock[];

  constructor(protected pdf: Pdf, private space: number, blocks: (PdfBlock | string)[]) {
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
