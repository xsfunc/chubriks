import { layers } from './layers'
import type { ColorProps, DrawProps, PatternProps } from './types'
import { paintPatternByType } from './patterns/paint-pattern'

export function drawFace({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()
  layers.drawBackground({ canvas, composition })
  layers.drawHead({ canvas, composition })
  layers.drawEyes({ canvas, composition })
  layers.drawNose({ canvas, composition })
  layers.drawMouth({ canvas, composition })
}

export function getFilling(fillingProps: ColorProps | PatternProps) {
  if (fillingProps.type === 'color')
    return fillingProps.color
  if (fillingProps.type === 'pattern')
    return paintPatternByType(fillingProps)
}

type Color = string
type HueShift = number
type Seed = number
type Width = number
type Height = number
type Radius = number
type FxParams = [
  // colors config
  [HueShift, Seed],
  // head: width, height,
  [Width, Height, Radius],
  // eyes
  [number, number, number],
  // nose,
  [number, number, number],
  // mouth
  [number, number, number],
  // effects
  [number, number, number],
]
// function transformParams(params: FxParams) {
//   const [colorConfig] = params
//   const [hue, seed] = colorConfig
//   const colors = new Poline({
//     numPoints: seed,
//   }).colors
//   return {
//     colors,
//     patterns,
//     effects,
//   }
// }
