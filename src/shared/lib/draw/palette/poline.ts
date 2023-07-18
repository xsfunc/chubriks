import { Poline } from 'poline'

export function createPoline({
  hueShift = 0,
  numPoints = 6,
}: CreatePolineOptions) {
  const poline = new Poline({
    numPoints,
    anchorColors: [
      [347, 0.82, 0.80],
      [93, 0.33, 0.04],
    ],
  })

  poline.shiftHue(hueShift)
  return poline
}

export const polinePalette = (poline: Poline | null): string[] => poline ? poline.colorsCSSoklch : []

interface CreatePolineOptions {
  hueShift?: number
  numPoints?: number
  seed?: number
}
