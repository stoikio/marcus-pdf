import deepmerge from "deepmerge";
import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";

export class PDFSVG extends PDFBlock {
  constructor(protected pdf: PDF, private _svg: string) {
    super();
  }

  build() {
    const build = {
      svg: this._svg,
      width: this._width,
    }

    return deepmerge(super.build(), build);
  }
}
