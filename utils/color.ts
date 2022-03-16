import { RGBAColor } from "@deck.gl/core/utils/color";

export const hexToRgb = (hex: string) =>
  hex.match(/[0-9a-f]{2}/g)!.map((x) => parseInt(x, 16)) as RGBAColor;
