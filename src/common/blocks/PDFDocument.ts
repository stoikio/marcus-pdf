import { formatMargin, mergeMargin } from "../utils";
import { PDF } from "./PDF";
import { PDFBlock } from "./PDFBlock";
import { PDFText } from "./PDFText";

export class PDFDocument {
  protected _footer?: ((currentPage: number, pageCount: number) => (PDFBlock | string));
  protected _title!: string;

  constructor(protected pdf: PDF, private rootBlock: PDFBlock) { }

  Footer(content: PDFBlock | string | ((currentPage: number, pageCount: number) => PDFBlock | string)) {
    if (typeof content === 'function') {
      this._footer = content;
    } else {
      this._footer = (() => content);
    }
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

        pageMargins: this.pdf.options.pageMargins,
        pageOrientation: this.pdf.options.pageOrientation,
        pageSize: this.pdf.options.pageSize,

        footer: this._footer ? (currentPage: number, pageCount: number) => {
          const margin = formatMargin(this.pdf.options.pageMargins)

          const content = this._footer ? this._footer(currentPage, pageCount) : undefined

          return {
            margin: [margin[0], 0, margin[2], 0],
            columns: content ? [
              (typeof content === "string" ? new PDFText(this.pdf, content) : content).build(),
            ] : undefined,
          };
        } : undefined,

        info: {
          title: this._title,
        },
      },
      tableLayouts: this.pdf.tableLayouts,
    } as const;
  }
}
