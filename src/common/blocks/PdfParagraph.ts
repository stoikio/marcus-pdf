import { Pdf } from "./Pdf";
import { pushBetween } from "../utils/push-between";
import { PdfBlock } from "./PdfBlock";
import { PdfText } from "./PdfText";

export class PdfParagraph extends PdfBlock {
  private _texts: PdfText[];
  private _noSpace: boolean = false;

  constructor(protected pdf: Pdf, ...texts: (PdfText | string)[]) {
    super();
    this._texts = texts.map((text) => {
      if (typeof text === "string") {
        return new PdfText(pdf, text);
      } else {
        return text;
      }
    });
  }

  build() {
    const transpiledTexts = this._texts.map((text) => text.build());

    return {
      text: this._noSpace ? transpiledTexts : pushBetween(transpiledTexts, new PdfText(this.pdf, " ").build()),
    };
  }

  noSpace() {
    this._noSpace = true;
    return this;
  }
}
