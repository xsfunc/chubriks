import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import type { Pattern } from '@svgdotjs/svg.js'
import type { HerringbonePatternOptions } from './types'
import { PATTERN } from './pattern'

const initial = {
  patternType: PATTERN.HERRINGBONE,
  scale: 1,
  rotate: 0,
  strokeWidth: 1,
}

function svg(options: HerringbonePatternOptions): Pattern {
  const defaultBackground = 'black'
  const defaultWavesColor = 'white'
  const size = [40, 20]
  const {
    scale = 1,
    rotate = 0,
    strokeWidth = 1,
    color1 = defaultWavesColor,
    color2 = defaultBackground,
  } = options

  const pattern = SVG()
    .pattern(...size)
    .transform({ scale, rotate })
    .attr({
      patternUnits: 'userSpaceOnUse',
      id: nanoid(4),
    })
  pattern.rect(...size).fill(color2)
  pattern.path('M40 0L20-10V0l20 10zm0 10L20 0v10l20 10zm0 10L20 10v10l20 10zM0 20l20-10v10L0 30zm0-10L20 0v10L0 20zM0 0l20-10V0L0 10z')
    .stroke(color1)
    .stroke({ width: strokeWidth })
    .fill('none')

  return pattern
}

export const herringbone = {
  initial,
  svg,
}
