import { TFontDictionary } from "pdfmake/interfaces";

export type DropFirstInTuple<T extends any[]> = ((...args: T) => any) extends (arg: any, ...rest: infer U) => any ? U : T;

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type GeneratePdfAssets = {
  fonts: TFontDictionary;
  images: Record<string, any>;
};
