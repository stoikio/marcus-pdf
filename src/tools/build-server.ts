import PdfMake from "pdfmake";
import { PdfDocument } from "..";
import { GeneratePdfAssets } from "../utils/types";

export const generateServerPdf = (doc: PdfDocument, assets: GeneratePdfAssets) => {
  const { document, tableLayouts } = doc.build();
  const { images, fonts } = assets;

  (document as any).images = images;

  return new PdfMake(fonts).createPdfKitDocument(document as any, { tableLayouts: tableLayouts as any });
};
