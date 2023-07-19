import { Poline, positionFunctions } from 'poline'

export function createPoline({
  hueShift = 0,
  numPoints = 3,
  // random,
  // resetRandom,
}: CreatePolineOptions) {
  $fx.randminter.reset()
  const random = $fx.randminter

  const rndRange = (min = 0, max = 1) => min + random() * (max - min)
  const rndArr = (items: number[], min = 0, max = 1) => items[Math.floor(rndRange(min, max) * items.length)]

  const harmonies = [-30, 30, 180, -90, 90, 120, -120]
  const randomHarmony = rndArr(harmonies)
  const settings = {
    anchors: (baseHue: number, randomHarmony: number): [number, number, number][] => [
      [ // sets a random relatively bright and saturated point at a randomHue
        baseHue,
        0.6 + random() * 0.4,
        0.5 + random() * 0.5,
      ],
      [ // sets a very dark color in the center of the color system
        baseHue - randomHarmony * 0.5,
        0.1 + random() * 0.2,
        random() * 0.2,
      ],
      [ // sets a final saturated and bright color
        baseHue + randomHarmony,
        0.7 + random() * 0.3,
        0.8 + random() * 0.2,
      ],
    ],

    positionFunctionY: positionFunctions.sinusoidalPosition,
    positionFunctionX: positionFunctions.quadraticPosition,
    positionFunctionZ: positionFunctions.linearPosition,
  }

  const poline = new Poline({
    numPoints,
    anchorColors: settings.anchors(hueShift, randomHarmony),
    positionFunctionY: settings.positionFunctionY,
    positionFunctionX: settings.positionFunctionX,
    positionFunctionZ: settings.positionFunctionZ,
  })

  return poline
}

export function polinePalette(poline: Poline | null): string[] {
  return poline ? poline.colorsCSSoklch : []
}

interface CreatePolineOptions {
  hueShift?: number
  numPoints?: number
  seed?: number
  random: () => number
  resetRandom: () => void
}
