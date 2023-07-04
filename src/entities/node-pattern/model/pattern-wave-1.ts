import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import type { Pattern } from '@svgdotjs/svg.js'
import type { Options } from './types'

export function wave1Pattern(options: Options): Pattern {
  const { scale = 1, rotate = 0, strokeWidth = 1, waveColors, backgroundColor } = options
  const size = [120, 20]

  const pattern = SVG()
    .pattern(...size)
    .transform({ scale, rotate })
    .attr({
      patternUnits: 'userSpaceOnUse',
      id: nanoid(4),
    })
  pattern.rect(...size).fill(backgroundColor)
  pattern.path('M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685')
    .stroke({ width: strokeWidth, color: waveColors[0] })
    .fill('none')

  return pattern
}
