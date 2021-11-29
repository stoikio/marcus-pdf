import PdfMake from "pdfmake/build/pdfmake";
import { PdfDocument } from "../common/blocks";
import { ClientPdf, GeneratePdfAssets } from "../common/utils/types";

export const generateClientPdf = async (doc: PdfDocument, assets: GeneratePdfAssets): Promise<ClientPdf> => {
  const { document, tableLayouts } = doc.build();
  const { images, fonts } = assets;

  Object.keys(images).forEach(async (key) => {
    const value = images[key];

    if (!value.startsWith("data:image")) {
      const arrayBufferImage = await fetch(value).then((res) => res.arrayBuffer());
      images[key] = arrayBufferImage;
    }
  });

  return PdfMake.createPdf(document as any, tableLayouts, fonts, images);
};
