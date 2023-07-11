import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import type { Pattern, Svg } from '@svgdotjs/svg.js'
import type { CrossPatternOptions } from './types'

const defaultBackground = 'black'
const defaultWavesColor = 'white'

export function herringBonePattern(options: CrossPatternOptions, draw?: Svg): Pattern {
  const size = [40, 20]
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
  pattern.path('M40 0L20-10V0l20 10zm0 10L20 0v10l20 10zm0 10L20 10v10l20 10zM0 20l20-10v10L0 30zm0-10L20 0v10L0 20zM0 0l20-10V0L0 10z')
    .stroke(color1)
    .stroke({ width: strokeWidth })
    .fill('none')

  if (draw)
    pattern.addTo(draw)

  return pattern
}
