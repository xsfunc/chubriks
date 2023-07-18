import { layers } from './layers'
import type { ColorProps, DrawProps, PatternProps } from './types'
import { paintPatternByType } from './patterns/paint-pattern'
import { createPoline } from './palette/poline'

export function drawComposition({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  const { hueShift, seed } = composition.palette
  const poline = createPoline({ seed, hueShift })
  const colors = poline.colorsCSS
  const compositionWithColors = { ...composition, colors }

  layers.drawBackground({ canvas, composition: compositionWithColors })
  // layers.drawHead({ canvas, composition })
  // layers.drawEyes({ canvas, composition })
  // layers.drawNose({ canvas, composition })
  // layers.drawMouth({ canvas, composition })
}

export function getFilling(fillingProps: ColorProps | PatternProps, colors) {
  if (fillingProps.type === 'color') {
    const color = fillingProps.color || colors[fillingProps.colorId]
    return { ...fillingProps, color }
  }
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
