import PDFMake from "pdfmake";
import { PDFDocument } from "../common/blocks/PDFDocument";
import { ServerPDFAssets, ServerPDF } from "./types";
import deepmerge from 'deepmerge'

const DEFAULT_FONTS = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};

export const generateServerPDF = (doc: PDFDocument, assets: ServerPDFAssets = {}): ServerPDF => {
  const { document, tableLayouts } = doc.build();
  const { images, fonts = {} } = assets;

  if (images) {
    (document as any).images = images;
  }

  return new PDFMake(deepmerge(DEFAULT_FONTS, fonts)).createPdfKitDocument(document as any, { tableLayouts: tableLayouts as any });
};
