import { TFontDictionary } from "pdfmake/interfaces";

export type ServerPDFAssets = {
  fonts?: TFontDictionary;
  images?: Record<string, any>;
};

export type ServerPDF = PDFKit.PDFDocument;
