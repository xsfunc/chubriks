import { layers } from './layers'
import type { ColorProps, DrawProps, PatternProps } from './types'
import { paintPatternByType } from './patterns/paint-pattern'
import { createPoline } from './palette/poline'

export function drawComposition({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  const { hueShift, seed } = composition.palette
  const poline = createPoline({ seed, hueShift, random: $fx.randminter, resetRandom: $fx.randminter.reset })
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
