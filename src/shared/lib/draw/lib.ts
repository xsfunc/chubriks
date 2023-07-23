import type { Element } from '@svgdotjs/svg.js'
import { layers } from './layers'
import type { CompositionProps, DrawProps, FillingProps } from './types'
import { paintPatternByType } from './patterns/paint-pattern'
import { createPoline, polinePalette } from './palette/poline'

export function drawComposition({ canvas, composition }: DrawProps) {
  canvas.draw.clear()
  canvas.draw.defs().clear()

  const poline = createPoline(composition.palette)
  const colors = polinePalette(poline)
  const withColors = { ...composition, colors }

  layers.drawBackground({ canvas, composition: withColors })
  // layers.drawHead({ canvas, composition: withColors })
  // layers.drawEyes({ canvas, composition })
  // layers.drawNose({ canvas, composition })
  // layers.drawMouth({ canvas, composition })
}

// export function getFilling(fillingProps: ColorProps | PatternProps, colors) {
//   if (fillingProps.type === 'color') {
//     const color = fillingProps.color || colors[fillingProps.colorId]
//     return { ...fillingProps, color }
//   }
//   if (fillingProps.type === 'pattern')
//     return paintPatternByType(fillingProps)
// }

export function hasColor(prop: { color: string } | { colorId: number }): prop is { color: string } {
  return (prop as { color: string }).color !== undefined
}

export function getPaint(paintProps: FillingProps, composition: CompositionProps): string | Element {
  if (paintProps.type === 'color') {
    if (hasColor(paintProps)) {
      return paintProps.color
    }
    else {
      const id = paintProps.colorId
      return composition.colors[id]
    }
  }
  else if (paintProps.type === 'pattern') {
    const { patternId: id, color1, color2, color3 } = paintProps
    const pattern = {
      ...composition.patterns[id],
      color1: getPaint(color1, composition),
      color2: getPaint(color2, composition),
      color3: getPaint(color3, composition),
    }
    return paintPatternByType(pattern) as Element
  }
  else {
    return 'black'
  }
}
