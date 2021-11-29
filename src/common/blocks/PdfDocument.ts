import { Pdf } from "./Pdf";
import { PdfBlock } from "./PdfBlock";
import { PdfText } from "./PdfText";

type PageNumber = (currentPage: number, pageCount: number) => string;

export class PdfDocument {
  protected _footer!: PdfBlock;
  protected _pageNumber!: PageNumber;
  protected _title!: string;

  constructor(protected pdf: Pdf, private rootBlock: PdfBlock) {}

  Footer(block: PdfBlock | string) {
    if (typeof block === "string") {
      this._footer = new PdfText(this.pdf, block);
    } else {
      this._footer = block;
    }
    return this;
  }

  PageNumber(pageNumber?: PageNumber) {
    this._pageNumber = pageNumber ?? ((currentPage, pageCount) => `${currentPage}/${pageCount}`);
    return this;
  }

  title(title: string) {
    this._title = title;
    return this;
  }

  build() {
    return {
      document: {
        content: [this.rootBlock.build()],
        defaultStyle: {
          fontSize: this.pdf.styles.fontSize,
          color: this.pdf.styles.color,
          lineHeight: this.pdf.styles.lineHeight,
        },

        pageMargins: [this.pdf.options.pageMargins, this.pdf.options.pageMargins, this.pdf.options.pageMargins, this.pdf.options.pageMargins],
        pageOrientation: this.pdf.options.pageOrientation,
        pageSize: this.pdf.options.pageSize,

        footer: (currentPage: any, pageCount: any) => {
          return {
            margin: [this.pdf.options.pageMargins, 0, this.pdf.options.pageMargins, 0],
            columns: this._pageNumber
              ? [
                  this._footer?.build(), //
                  new PdfText(this.pdf, this._pageNumber(currentPage, pageCount)).secondary().align("right").width(100).build(),
                ]
              : [
                  this._footer?.build(), //
                ],
          };
        },

        info: {
          title: this._title,
        },
      },
      tableLayouts: this.pdf.tableLayouts,
    } as const;
  }
}
