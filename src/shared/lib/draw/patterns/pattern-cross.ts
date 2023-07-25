import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import type { Pattern } from '@svgdotjs/svg.js'
import type { CrossPatternOptions } from './types'
import { PATTERN } from './pattern'

const initial = {
  patternType: PATTERN.CROSS,
  scale: 1,
  rotate: 0,
  strokeWidth: 1,
}

function svg(options: CrossPatternOptions): Pattern {
  const defaultBackground = 'black'
  const defaultWavesColor = 'white'
  const size = [20, 20]
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
  pattern.path('M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z')
    .stroke(color1)
    .stroke({ width: strokeWidth })
    .fill('none')

  return pattern
}

export const cross = {
  initial,
  svg,
}
