import { layers } from './layers'
import type { ColorProps, DrawProps, PatternProps } from './types'
import { paintPatternByType } from './patterns/paint-pattern'
import { createPoline, polinePalette } from './palette/poline'

export function drawComposition({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  const { hueShift, seed } = composition.palette
  const poline = createPoline({ seed, hueShift })
  const colors = polinePalette(poline)
  const withColors = { ...composition, colors }

  layers.drawBackground({ canvas, composition: withColors })
  layers.drawHead({ canvas, composition: withColors })
  layers.drawEyes({ canvas, composition })
  layers.drawNose({ canvas, composition })
  layers.drawMouth({ canvas, composition })
}

export function getFilling(fillingProps: ColorProps | PatternProps, colors) {
  if (fillingProps.type === 'color') {
    const color = fillingProps.color || colors[fillingProps.colorId]
    return { ...fillingProps, color }
  }
  if (fillingProps.type === 'pattern')
    return paintPatternByType(fillingProps)
}
