import PDFMake from "pdfmake/build/pdfmake";
import { PDFDocument } from "../common/blocks/PDFDocument";
import { ClientPDF, ClientPDFAssets } from "./types";
import { mapAsync } from "./utils";

export const DEFAULT_FONTS = {
  Helvetica: {
    normal: 'https://fonts.cdnfonts.com/s/29136/Helvetica55Roman_22439.woff',
    bold: 'https://fonts.cdnfonts.com/s/29136/Helvetica85Heavy_22449.woff',
    italics: 'https://fonts.cdnfonts.com/s/29136/Helvetica56Italic_22440.woff',
    bolditalics: 'tps://fonts.cdnfonts.com/s/29136/Helvetica86HeavyItalic_22450.woff',
  },
};

export const generateClientPDF = async (doc: PDFDocument, assets: ClientPDFAssets = {}): Promise<ClientPDF> => {
  const { document, tableLayouts } = doc.build();
  const { images, fonts = DEFAULT_FONTS } = assets;

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