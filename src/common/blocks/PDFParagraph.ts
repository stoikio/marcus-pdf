import { PDF } from "./PDF";
import { pushBetween } from "../utils";
import { PDFBlock } from "./PDFBlock";
import { PDFText } from "./PDFText";
import deepmerge from "deepmerge";
import { PDFTextStyle } from "./PDFTextStyle";

export class PDFParagraph extends PDFTextStyle {
  private _texts: PDFText[];
  private _noSpaces: boolean = false;

  constructor(protected pdf: PDF, ...texts: (PDFText | string)[]) {
    super(pdf);

    this._texts = texts.map((text) => {
      if (typeof text === "string") {
        return new PDFText(pdf, text);
      } else {
        return text;
      }
    });
  }

  noSpaces() {
    this._noSpaces = true;
    return this;
  }

  build() {
    const transpiledTexts = this._texts.map((text) => text.build());

    const build = {
      text: this._noSpaces ? transpiledTexts : pushBetween(transpiledTexts, new PDFText(this.pdf, " ").build()),
    };

    return deepmerge(super.build(), build);
  }
}
