import { SVG } from '@svgdotjs/svg.js'
import { nanoid } from 'nanoid'
import type { Pattern } from '@svgdotjs/svg.js'
import type { WavesPatternOptions } from './types'
import { PATTERN } from './pattern'

const initial = {
  patternType: PATTERN.WAVES,
  scale: 1,
  rotate: 0,
  strokeWidth: 1,
}

export function svg(options: WavesPatternOptions): Pattern {
  const size = [120, 20]
  const {
    scale = 1,
    rotate = 0,
    strokeWidth = 1,
    color1,
    color2,
  } = options

  const pattern = SVG()
    .pattern(...size)
    .transform({ scale, rotate })
    .attr({
      patternUnits: 'userSpaceOnUse',
      id: nanoid(4),
    })

  pattern.rect(...size)
    .fill(color1)
  pattern.path('M-50.129 12.685C-33.346 12.358-16.786 4.918 0 5c16.787.082 43.213 10 60 10s43.213-9.918 60-10c16.786-.082 33.346 7.358 50.129 7.685')
    .stroke(color2)
    .stroke({ width: strokeWidth })
    .fill('none')

  return pattern
}

function convertToArray(options: WavesPatternOptions): number[] {
  return [
    options.rotate,
    options.scale,
    options.strokeWidth,
    options.color1,
    options.color2,
  ]
}

function convertToObject(arr: number[]): WavesPatternOptions {
  return {
    patternType: PATTERN.WAVES,
    rotate: arr[0],
    scale: arr[1],
    strokeWidth: arr[2],
    color1: arr[3],
    color2: arr[4],
  }
}

export const waves = {
  svg,
  initial,
  toArray: convertToArray,
  toObject: convertToObject,
}
