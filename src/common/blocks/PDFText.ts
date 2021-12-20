import deepmerge from "deepmerge";
import { Alignment } from "pdfmake/interfaces";
import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";
import { PDFTextStyle } from "./PDFTextStyle";

export class PDFText extends PDFTextStyle {
  constructor(protected pdf: PDF, private text: string) {
    super(pdf);
  }

  build() {
    const build = {
      text: this.text,
    };

    return deepmerge(super.build(), build);
  }
}
