import PDFMake from "pdfmake/build/pdfmake";
import { PDFDocument } from "../common/blocks/PDFDocument";
import { ClientPDF, ClientPDFAssets } from "./types";
import { mapAsync } from "./utils";

export const buildPDF = async (doc: PDFDocument, assets: ClientPDFAssets): Promise<ClientPDF> => {
  const { document, tableLayouts } = doc.build();
  const { images, fonts } = assets;

  if (images) {
    await mapAsync(Object.keys(images), async (key) => {
      const value = images[key];

      if (!value.startsWith("data:image")) {
        const arrayBufferImage = await fetch(value).then((res) => res.arrayBuffer());
        images[key] = arrayBufferImage;
      }
    });
  }

  return PDFMake.createPdf(document as any, tableLayouts, fonts, images);
};