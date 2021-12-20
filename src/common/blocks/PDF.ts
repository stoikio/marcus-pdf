
import { PageOrientation, PageSize } from "pdfmake/interfaces";
import { PDFDocument } from "./PDFDocument";
import { PDFH1 } from "./PDFH1";
import { PDFH2 } from "./PDFH2";
import { PDFImage } from "./PDFImage";
import { PDFSVG } from "./PDFSVG";
import { PDFList } from "./PDFList";
import { PDFPageBreak } from "./PDFPageBreak";
import { PDFParagraph } from "./PDFParagraph";
import { PDFSpace } from "./PDFSpace";
import { PDFTable } from "./PDFTable";
import { PDFTableRow } from "./PDFTableRow";
import { PDFText } from "./PDFText";
import { DropFirstInTuple, RecursivePartial } from "../types";

import deepmerge from 'deepmerge'

const DEFAULT_STYLES_COLOR = "#323232";
const DEFAULT_STYLES_SECONDARY_COLOR = "#888888";
const DEFAULT_STYLES_BOLD = false;
const DEFAULT_STYLES_FONT_SIZE = 10;
const DEFAULT_STYLES_LINE_HEIGHT = 1.05;
const DEFAULT_STYLES_PAGE_MARGINS = [64, 48];

const DEFAULT_OPTIONS = {
  pageOrientation: "portrait" as PageOrientation,
  pageSize: "A4" as PageSize,
  pageMargins: DEFAULT_STYLES_PAGE_MARGINS as number | [x: number, y: number] | [left: number, top: number, right: number, bottom: number],
  styles: {
    font: "Helvetica" as string,
    color: DEFAULT_STYLES_COLOR,
    secondaryColor: DEFAULT_STYLES_SECONDARY_COLOR,
    bold: DEFAULT_STYLES_BOLD,
    fontSize: DEFAULT_STYLES_FONT_SIZE,
    lineHeight: DEFAULT_STYLES_LINE_HEIGHT,
    image: {
      defaultWidth: 100,
    },
    h1: {
      fontSize: 18,
      lineHeight: 1,
      bold: true,
      color: undefined as unknown as string,
    },
    h2: {
      fontSize: 12,
      lineHeight: undefined as unknown as number,
      bold: true,
      color: undefined as unknown as string,
    },
    table: {
      borders: false,
      row: {
        fillColor: "#ffffff",
        padding: 0 as number | [x: number, y: number] | [left: number, top: number, right: number, bottom: number],
      },
    },
  },
};

type PDFOptions = typeof DEFAULT_OPTIONS;

export class PDF {
  options: PDFOptions;
  tableLayouts: Record<string, any> = {};

  constructor(options?: RecursivePartial<PDFOptions>) {
    this.options = (deepmerge(DEFAULT_OPTIONS, options as any) as PDFOptions) ?? DEFAULT_OPTIONS;
  }

  public get styles() {
    return this.options.styles;
  }

  addTableLayout(name: string, content: any) {
    this.tableLayouts[name] = content;
  }

  factory = <T extends new (...args: any) => any>(class_: T): ((...arg: DropFirstInTuple<ConstructorParameters<T>>) => InstanceType<T>) => {
    return (...arg) => new class_(this, ...arg);
  };

  SVG = this.factory(PDFSVG);
  Image = this.factory(PDFImage);
  Text = this.factory(PDFText);
  H1 = this.factory(PDFH1);
  H2 = this.factory(PDFH2);
  Paragraph = this.factory(PDFParagraph);
  Space = this.factory(PDFSpace);
  Document = this.factory(PDFDocument);
  PageBreak = this.factory(PDFPageBreak);
  Table = this.factory(PDFTable);
  TableRow = this.factory(PDFTableRow);
  List = this.factory(PDFList);
}
