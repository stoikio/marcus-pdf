
import { PageOrientation, PageSize } from "pdfmake/interfaces";
import { PdfDocument } from "./PdfDocument";
import { PdfH1 } from "./PdfH1";
import { PdfH2 } from "./PdfH2";
import { PdfImage } from "./PdfImage";
import { PdfList } from "./PdfList";
import { PdfPageBreak } from "./PdfPageBreak";
import { PdfParagraph } from "./PdfParagraph";
import { PdfSpace } from "./PdfSpace";
import { PdfTable } from "./PdfTable";
import { PdfTableRow } from "./PdfTableRow";
import { PdfText } from "./PdfText";
import { DropFirstInTuple, RecursivePartial } from "../utils/types";

import deepmerge from 'deepmerge'

const DEFAULT_STYLES_COLOR = "#323232";
const DEFAULT_STYLES_SECONDARY_COLOR = "#888888";
const DEFAULT_STYLES_BOLD = false;
const DEFAULT_STYLES_FONT_SIZE = 10;
const DEFAULT_STYLES_LINE_HEIGHT = 1.05;
const DEFAULT_STYLES_PAGE_MARGINS = 70;

const DEFAULT_OPTIONS = {
  pageOrientation: "portrait" as PageOrientation,
  pageSize: "A4" as PageSize,
  pageMargins: DEFAULT_STYLES_PAGE_MARGINS,
  styles: {
    font: "Roboto" as string,
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
      bold: false,
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

type PdfOptions = typeof DEFAULT_OPTIONS;

export class Pdf {
  options: PdfOptions;
  tableLayouts: Record<string, any> = {};

  constructor(options?: RecursivePartial<PdfOptions>) {
    this.options = (deepmerge(DEFAULT_OPTIONS, options as any) as PdfOptions) ?? DEFAULT_OPTIONS;
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

  Image = this.factory(PdfImage);
  Text = this.factory(PdfText);
  H1 = this.factory(PdfH1);
  H2 = this.factory(PdfH2);
  Paragraph = this.factory(PdfParagraph);
  Space = this.factory(PdfSpace);
  Document = this.factory(PdfDocument);
  PageBreak = this.factory(PdfPageBreak);
  Table = this.factory(PdfTable);
  TableRow = this.factory(PdfTableRow);
  List = this.factory(PdfList);
}
