import deepmerge from "deepmerge";
import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";

export class PDFImage extends PDFBlock {
  constructor(protected pdf: PDF, private path: string) {
    super();
  }

  build() {
    const build = {
      image: this.path,
      width: this._width,
    }

    return deepmerge(super.build(), build);
  }
}
