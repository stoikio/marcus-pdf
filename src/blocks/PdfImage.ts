import { Pdf } from "./Pdf";
import { PdfBlock } from "./PdfBlock";

export class PdfImage extends PdfBlock {
  _width: number = this.pdf.styles.image.defaultWidth;

  constructor(protected pdf: Pdf, private path: string) {
    super();
  }

  width(width: number) {
    this._width = width;
    return this;
  }

  build() {
    return {
      image: this.path,
      width: this._width,
    };
  }
}
