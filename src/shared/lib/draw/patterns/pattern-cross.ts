import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import type { Pattern, Svg } from '@svgdotjs/svg.js'
import type { CrossPatternOptions } from './types'

const defaultBackground = 'black'
const defaultWavesColor = 'white'

export function crossPattern(options: CrossPatternOptions, draw?: Svg): Pattern {
  const size = [20, 20]
  const {
    scale = 1,
    rotate = 0,
    strokeWidth = 1,
    color1 = defaultWavesColor,
    background = defaultBackground,
  } = options

  const pattern = SVG()
    .pattern(...size)
    .transform({ scale, rotate })
    .attr({
      patternUnits: 'userSpaceOnUse',
      id: nanoid(4),
    })
  pattern.rect(...size).fill(background)
  pattern.path('M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z')
    .stroke(color1)
    .stroke({ width: strokeWidth })
    .fill('none')

  if (draw)
    pattern.addTo(draw)

  return pattern
}
