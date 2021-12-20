import { TCreatedPdf } from "pdfmake/build/pdfmake";
import { TFontDictionary } from "pdfmake/interfaces";

export type ClientPDFAssets = {
  fonts?: TFontDictionary;
  images?: Record<string, any>;
};

export type ClientPDF = TCreatedPdf;
