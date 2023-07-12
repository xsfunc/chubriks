import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import type { Pattern, Svg } from '@svgdotjs/svg.js'
import type { WavesPatternOptions } from './types'

const defaultBackground = 'black'
const defaultWavesColor = 'white'

export function wavePattern(options: WavesPatternOptions, draw?: Svg): Pattern {
  const size = [120, 20]
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
  pattern.path('M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685')
    .stroke(color1)
    .stroke({ width: strokeWidth })
    .fill('none')

  if (draw)
    pattern.addTo(draw)

  return pattern
}