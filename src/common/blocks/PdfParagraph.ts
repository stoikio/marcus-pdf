import { PDF } from "./PDF";
import { pushBetween } from "../utils";
import { PDFBlock } from "./PDFBlock";
import { PDFText } from "./PDFText";

export class PDFParagraph extends PDFBlock {
  private _texts: PDFText[];
  private _noSpace: boolean = false;

  constructor(protected pdf: PDF, ...texts: (PDFText | string)[]) {
    super();
    this._texts = texts.map((text) => {
      if (typeof text === "string") {
        return new PDFText(pdf, text);
      } else {
        return text;
      }
    });
  }

  build() {
    const transpiledTexts = this._texts.map((text) => text.build());

    return {
      text: this._noSpace ? transpiledTexts : pushBetween(transpiledTexts, new PDFText(this.pdf, " ").build()),
    };
  }

  noSpace() {
    this._noSpace = true;
    return this;
  }
}
